'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:ChartCtrl
 * @description Gathers data for and creates the bar graph, line graph, tree map, and pie chart. Also controlls toggle buttons and filters for each.
 * # ChartCtrl
 * Controller of the gapFront
 */
 angular.module('gapFront')
 .controller('ChartCtrl', function ($scope, $filter, IntegrationService, APIService, DrugService) {
  $scope.awesomeThings = [
  'HTML5 Boilerplate',
  'AngularJS',
  'Karma'
  ];
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

    $scope.least=0;
    $scope.greatest=100;

    var initChart = function(params){
      $scope.selectedDrug = DrugService.getSelectedDrug();
      APIService.getDrugsApi().get($scope.selectedDrug.brand_name).then(function(resp){
        DrugService.setSelectedDrugInfo(resp);
        $scope.drugEffects = resp.effects;
        console.log($scope.drugEffects);
        $scope.setChartData();
      });
      $scope.searchDrugEvents();
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

      query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name+' AND serious:2';
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
      console.log($scope.selectedDrug);
      $scope.crowdVerified = data;
      $scope.chart = data;

      $scope.effects = [];
      $scope.treeData = [];
      $scope.crowdVerified = [];
      var numbers = [];
      $scope.counts = [{name: "Reported Adverse Effects", data: numbers}];
      for (var i in $scope.chart) {
        // $scope.crowdVerified.push($scope.chart[i].term);
        $scope.effects.push($scope.chart[i].term);
        $scope.counts[0].data.push($scope.chart[i].count);

        if($scope.drugEffects){
          if ($scope.drugEffects.yes_answers[$scope.chart[i].term]) {
            if $scope.drugEffects.no_answers[$scope.chart[i].term]) {
              if($scope.drugEffects.yes_answers[$scope.chart[i].term] > $scope.drugEffects.no_answers[$scope.chart[i].term]){ // more in yes
                $scope.treeData.push({name: $scope.chart[i].term, value: $scope.chart[i].count, colorValue: 2});
              }
              else if($scope.drugEffects.yes_answers[$scope.chart[i].term] == $scope.drugEffects.no_answers[$scope.chart[i].term]){ // equal yes and no votes
                $scope.treeData.push({name: $scope.chart[i].term, value: $scope.chart[i].count, colorValue: 0});
              }
              else {
                $scope.treeData.push({name: $scope.chart[i].term, value: $scope.chart[i].count, colorValue: 1}); // more in no
              }
            } else {
              $scope.treeData.push({name: $scope.chart[i].term, value: $scope.chart[i].count, colorValue: 2});
            }
          } else if ($scope.drugEffects.no_answers[$scope.chart[i].term]){
            $scope.treeData.push({name: $scope.chart[i].term, value: $scope.chart[i].count, colorValue: 0});
          } else {
            $scope.treeData.push({name: $scope.chart[i].term, value: $scope.chart[i].count, colorValue: 1}); // more in no
          }
        }
      }
      createChart();
      createTreeChart();
      $scope.terms = $scope.chart;
      console.log($scope.treeData);

      // APIService.getVerifiedApi().post($scope.crowdVerified).then(function(){
      //   console.log("sent");
      // }, function(){
      //   console.log("Error");
      // });

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
            type: 'bar'
          },
          title: {
            text: 'Top 25 Reported Adverse Effects for ' + $scope.selectedDrug.brand_name,
            style: {
                color: '#333',
                fontWeight: 'normal',
                fontSize: 14,
            }
          },
          xAxis: [{
            tickWidth: 0,
            lineWidth: 0,
            categories: $scope.effects,
            labels: {
              x: chartContainerWidth * (5/11),
              useHTML: true,
              formatter: function() {
                // return '<img src="http://highcharts.com/demo/gfx/sun.png"><img>&nbsp;';
              }
            }
          }, {
            linkedTo: 0,
            categories: $scope.effects
          }],
          yAxis: {
            min: 0,

            title: {
              text: 'Counts'
            },
            lineColor: '#666666'
          },
          legend: {
            reversed: true
          },
          plotOptions: {
            series: {
              stacking: 'normal'
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
            data: [
            ["Serious", $scope.percentSerious],
            ["Non-serious", $scope.percentNonSerious]
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
            $('#createTreeChart').highcharts({
              exporting: {
                enabled: false
              },
        colorAxis: {
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[0],
            stops: [
                [0, '#3060cf'],
                [0.5, Highcharts.getOptions().colors[1]],
                [0.9, Highcharts.getOptions().colors[0]]
            ]
        },
        series: [{
            type: "treemap",
            layoutAlgorithm: 'squarified',
            data: $scope.treeData
            // [{
            //     name: 'A',
            //     value: 6,
            //     colorValue: 1
            // }, {
            //     name: 'B',
            //     value: 6,
            //     colorValue: 2
            // }, {
            //     name: 'C',
            //     value: 4,
            //     colorValue: 3
            // }, {
            //     name: 'D',
            //     value: 3,
            //     colorValue: 4
            // }, {
            //     name: 'E',
            //     value: 2,
            //     colorValue: 5
            // }, {
            //     name: 'F',
            //     value: 2,
            //     colorValue: 6
            // }, {
            //     name: 'G',
            //     value: 1,
            //     colorValue: 7
            // }]
        }],
        title: {
            text: 'Highcharts Treemap'
        }
    });
      }

    });
