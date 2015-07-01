'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:ChartCtrl
 * @description Gathers data for and creates the bar graph, line graph, tree map, and pie chart. Also controlls toggle buttons and filters for each.
 * # ChartCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('ChartCtrl', function ($scope, $filter, IntegrationService, APIService, DrugService, $rootScope, $location, $anchorScroll) {

    $scope.initializeVariables = function initializeVariables() {
      $scope.filterType = "hospitalizations";
      $scope.seriousness = "all";
      $scope.outcome = "all";
      $scope.age = "all";
      $scope.totalReportedCount = 0;
      $scope.percentSerious = 50;
      $scope.percentNonSerious = 50;
      $scope.startDate = 19000101;
      $scope.endDate = 20500101;
      $scope.dateChartData = [];
      $scope.toggleCharts = true;
      $scope.alerts = ['alert'];

      $scope.least=0;
      $scope.greatest=100;
    };

    $scope.initializePie = function initializePie() {
      var query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name+' AND serious:2';
      APIService.aggregateDrugEvent(query, null, null).then(function(resp){
        $scope.nonSeriousCount = resp.meta.results.total;
        createPieChart();
      });

      query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name+' AND serious:1';
      APIService.aggregateDrugEvent(query, null, null).then(function(resp){
        $scope.seriousCount = resp.meta.results.total;
        createPieChart();
      });

      query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name;
      APIService.aggregateDrugEvent(query, null, null).then(function(resp){
        $scope.totalReportedCount = resp.meta.results.total;
        createPieChart();
      });
    };

    var initChart = function(){
      $scope.initializeVariables();
      $scope.selectedDrug = DrugService.getSelectedDrug();
      APIService.getDrugsApi().post({drug: $scope.selectedDrug}).then(function(resp){
        DrugService.setSelectedDrugInfo(resp.drug);
        IntegrationService.callIntegrationMethod('initLabelEffects',{});
        $scope.drugEffects = resp.effects;
        $scope.setChartData();
        $scope.initializePie();
        $scope.searchDrugEvents();
        $scope.alerts = [];


      }, function(error){
        $scope.alerts.push(error.data.message);
        $rootScope.$broadcast('scanner-started', { message: error.data.message });
      });
    };

    IntegrationService.registerIntegrationMethod('initChart', initChart);

    $scope.searchDrugEvents = function(){
      var query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name;

      if($scope.seriousness == "non_serious_adverse_events"){
        query += ' AND serious:2';
      }
      else if($scope.seriousness == 'serious_adverse_events'){
        query += ' AND serious:1';
      }

      if($scope.outcome == 'fatal'){
        query += ' AND patient.reaction.reactionoutcome:5';
      }
      else if($scope.outcome == 'resolving'){
        query += ' AND patient.reaction.reactionoutcome:2';
      }
      else if($scope.outcome == 'not_recovered_not_resolved'){
        query += ' AND patient.reaction.reactionoutcome:3';
      }
      else if($scope.outcome == 'recovered_resolved'){
        query += ' AND (patient.reaction.reactionoutcome:4 1)';
      }
      else if($scope.outcome == 'unknown'){
        query += ' AND patient.reaction.reactionoutcome:6';
      }

      if(this.least > 0 || this.greatest < 100){
        query += ' AND patient.patientonsetage:['+this.least+' TO ' + this.greatest + ']';
      }

      APIService.aggregateDrugEvent(query, 15, 'patient.reaction.reactionmeddrapt.exact').then(function(resp){
        $scope.setChartData(resp.results, resp.effects);
      },function(error){
      });

      query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name;
      query += ' AND receivedate:[' + $scope.startDate + ' TO ' + $scope.endDate + ']';
      APIService.getDrugDateReportCount(query, 'receivedate').then(function(resp){
        $scope.dateData = resp.results;
        $scope.countDateArray = [];
        $scope.dateData.map(function(date){

          var arr = [parse(date.time), date.count];
          $scope.countDateArray.push(arr);
        });
        createLineChart();

      });
      return true;
    };

    function parse(str) {
      if(!/^(\d){8}$/.test(str)) return "invalid date";
      var y = str.substr(0,4),
        m = str.substr(4,2),
        d = str.substr(6,2);
      return new Date(y,m,d).getTime();
    }

    $scope.setFilterType = function(filterType){
      $scope.filterType = filterType;
    };

    $scope.filtersUpdated = function(paramName, paramValue){
      $scope[paramName] = paramValue;
      $scope.searchDrugEvents();
    };

    $scope.setChartData = function(data){
      $scope.crowdVerified = data;
      $scope.chart = data;

      $scope.effects = [];
      $scope.treeData = [];
      $scope.crowdVerified = [];
      $scope.barLabels = {};
      var numbers = [];
      $scope.counts = [{name: "Reported Adverse Effects", data: numbers}];
      for (var i in $scope.chart) {
        // $scope.crowdVerified.push($scope.chart[i].term.toLowerCase());
        $scope.effects.push($scope.chart[i].term.toLowerCase());
        $scope.counts[0].data.push($scope.chart[i].count);

        if($scope.drugEffects){
          //console.log($scope.chart[i].term.toLowerCase());
          //console.log($scope.drugEffects.yes_answers);
          if($scope.chart[i].term.toLowerCase() in $scope.drugEffects.yes_answers) { //is in yes
            if ($scope.chart[i].term.toLowerCase() in $scope.drugEffects.no_answers) { // also in no
              if($scope.drugEffects.yes_answers[$scope.chart[i].term.toLowerCase()] > $scope.drugEffects.no_answers[$scope.chart[i].term.toLowerCase()]){ // more in yes
                $scope.treeData.push({name: $scope.chart[i].term.toLowerCase(), value: $scope.chart[i].count, colorValue: 2});
                $scope.barLabels[$scope.chart[i].term.toLowerCase()] = " <span class='glyphicon glyphicon-ok-sign' style='color:#5bc0de; font-size: 17px;'></span>";
              } else if($scope.drugEffects.yes_answers[$scope.chart[i].term.toLowerCase()] == $scope.drugEffects.no_answers[$scope.chart[i].term.toLowerCase()]){ // equal yes and no votes
                $scope.treeData.push({name: $scope.chart[i].term.toLowerCase(), value: $scope.chart[i].count, colorValue: 0});
                $scope.barLabels[$scope.chart[i].term.toLowerCase()] = " <span class='glyphicon glyphicon-exclamation-sign'  style='color:#f8ac59; font-size: 17px;'></span>";
              } else {
                $scope.treeData.push({name: $scope.chart[i].term.toLowerCase(), value: $scope.chart[i].count, colorValue: 1}); // more in no
                $scope.barLabels[$scope.chart[i].term.toLowerCase()] = " <span class='glyphicon glyphicon-ban-circle' style='color:#ed5565; font-size: 17px;'></span>";
              }
            } else { // not in no
              $scope.barLabels[$scope.chart[i].term.toLowerCase()] = " <span class='glyphicon glyphicon-ok-sign' style='color:#5bc0de; font-size: 17px;'></span>";
              $scope.treeData.push({name: $scope.chart[i].term.toLowerCase(), value: $scope.chart[i].count, colorValue: 2});
            }
          } else if ($scope.chart[i].term.toLowerCase() in $scope.drugEffects.no_answers) { // in no but not yes
            $scope.barLabels[$scope.chart[i].term.toLowerCase()] = " <span class='glyphicon glyphicon-ban-circle' style='color:#ed5565; font-size: 17px;'></span>";
            $scope.treeData.push({name: $scope.chart[i].term.toLowerCase(), value: $scope.chart[i].count, colorValue: 1}); // more in no
          } else { // in neither
            $scope.barLabels[$scope.chart[i].term.toLowerCase()] = " <span class='glyphicon glyphicon-question-sign' style='color:#d3d3d3; font-size: 17px;'></span>";
            $scope.treeData.push({name: $scope.chart[i].term.toLowerCase(), value: $scope.chart[i].count, colorValue: 0});
          }
        }
      }

      createChart();
      createTreeChart();
      $scope.terms= $scope.chart;

      // APIService.getVerifiedApi().post($scope.crowdVerified).then(function(){
      //   console.log("sent");
      // }, function(){
      //   console.log("Error");
      // });
    };

    Highcharts.setOptions({
      colors: ['#23b193', '#bde2d9']
    });

    //angular.element(document).ready();
    function createChart() {
      var colors = Highcharts.getOptions().colors;
      var chartContainerWidth = $('#chartContainer').width();
      //console.log(chartContainerWidth);
      $('#chartContainer').highcharts({
        exporting: {
          enabled: false
        },
        chart: {
          type: 'bar',
          events: {
            load: function() {
              $("#headerDiv").css('display', 'block');
              $('html, body').animate({
                scrollTop: $("#events-reports").offset().top
              }, 500);
            }
          }
        },
        title: {
          text: 'Top 25 Reported Adverse Effects for ' + $scope.selectedDrug.brand_name,
          style: {
            color: '#333',
            fontWeight: 'normal',
            fontSize: 14
          }
        },
        xAxis: [{
          title: {
            text: 'Verified?',
            align: "high",
            rotation: 0,
            textAlign: 'left',
            x: -10,
            y: -10
          },
          tickWidth: 0,
          lineWidth: 0,
          categories: $scope.effects,
          labels: {
            useHTML: true,
            formatter: function() {
              return $scope.barLabels[this.value];
            }
          }
        }, {
          linkedTo: 0,
          categories: $scope.effects,
          offset: 50
        }],
        yAxis: {
          min: 0,
          title: {
            text: 'Counts'
          },
          lineColor: '#666666'

        },
        legend: {
          enabled: false,
          reversed: true,
          useHTML: true,
          labelFormatter: function(){
            console.log(this);
            return " <span class='glyphicon glyphicon-ok-sign' style='color:#5bc0de; font-size: 17px;'></span> : Reported and verified on label <br>"
              + " <span class='glyphicon glyphicon-exclamation-sign' style='color:#f8ac59; font-size: 17px;'></span> : Reported but not verified <br>"
              + " <span class='glyphicon glyphicon-ban-circle' style='color:#ed5565; font-size: 17px;'></span> : Reported but incorrectly described <br>"
              + " <span class='glyphicon glyphicon-question-sign' style='color:#d3d3d3; font-size: 17px;'></span> : No crowd data"
          }
        },
        plotOptions: {
          series: {
            stacking: 'normal',
            events: {
              legendItemClick: function () {
                return false;
              }
            }
          }
        },
        rangeSelector: {
          selected: 1,
          inputEnabled: $('#chartContainer').height() > 480
        },

        series: $scope.counts

      });
    }
    function createPieChart() {
      $scope.percentSerious = ($scope.seriousCount / $scope.totalReportedCount) * 100;
      $scope.percentNonSerious = ($scope.nonSeriousCount / $scope.totalReportedCount) * 100;
      var totalReportedCount = $scope.totalReportedCount;

      $scope.pieChart = new Highcharts.Chart({
        exporting: {
          enabled: false
        },
        chart: {
          renderTo: 'totalReportedContainer',
          type: 'pie'
        },
        title: {
          text: 'Total Reported ' + $filter('number')($scope.totalReportedCount),
          style: {
            color: '#333',
            fontWeight: 'normal',
            fontSize: 14,
            align: "left"
          }

        },
        plotOptions: {
          pie: {
            innerSize: '60%'
          }
        },
        series: [{
          data: [{
            name: "Serious",
            y: $scope.percentSerious,
            color: "#1C7DC2"
          },
            {
              name: "Non-serious",
              y: $scope.percentNonSerious,
              color: "#4FB8E8"
            }
            //["Serious", $scope.percentSerious, "#000000"],
            //["Non-serious", $scope.percentNonSerious]
          ]}]
      });
    }

    function createLineChart() {

      var data = Highcharts.map($scope.countDateArray, function (config){
        return {
          x: config[0],
          y: config[1]
        };
      });

      var dataObject = {
        exporting: {
          enabled: false
        },
        rangeSelector: {
          selected: 1,
          inputEnabled: $('#container').width() > 480
        },

        title: {
          text: 'Reported Adverse Event Counts Over Time',
          style: {
            color: '#333',
            fontWeight: 'normal',
            fontSize: 14,
            align: "left"
          }
        },

        series: [{
          name: 'Count',
          data: data,
          color: "#1C7DC2",
          tooltip: {
          },
          turboThreshold: 0
        }],

        chart: {
          renderTo: 'lineGraphContainer'
        }
      };
      var chart = new Highcharts.StockChart(dataObject);
    }

    function createTreeChart(){
      Highcharts.setOptions({
        colors: ['#23b193', '#bde2d9', '#5bc0de', '#f8ac59', '#ed5565']
      });
      $scope.treeChart = $('#createTreeChart').highcharts({
        width: $("#"),
        exporting: {
          enabled: false
        },
        colorAxis: {
          dataClasses:[{
            from: 0,
            to: 0,
            name: 'Reported but not listed on label',
            color: Highcharts.getOptions().colors[3]
          },
            {
              from: 1,
              to: 1,
              name: 'Reported but incorrectly described',
              color: Highcharts.getOptions().colors[4]
            },
            {
              from: 2,
              to: 2,
              name: 'Reported and verified on label',
              color: Highcharts.getOptions().colors[2]

            }]

        },
        series: [{
          type: "treemap",
          layoutAlgorithm: 'squarified',
          data: $scope.treeData
        }],
        legend: {
          enabled: true
        },
        title: {
          text: 'Highcharts Treemap'
        },
        plotOptions: {
          series: {
            events: {
              load: function () {
                $scope.treeChart.redraw();
                $(window).resize();
                $scope.treeChart.redraw();
              }
            }
          }
        }
      });
    }

  });
