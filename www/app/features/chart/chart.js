'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('ChartCtrl', function ($scope, IntegrationService, APIService, DrugService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.filterType = "hospitalizations" //
    $scope.seriousness = "all";
    $scope.outcome = "all";
    $scope.age = "all";
    $scope.totalReportedCount = 0;
    $scope.percentSerious = 50;
    $scope.percentNonSerious = 50;
    $scope.startDate = 19000101;
    $scope.endDate = 20500101;
    $scope.dateChartData = [];

    $scope.least=0;
    $scope.greatest=100;

    var  initChart = function(params){
      $scope.selectedDrug = DrugService.getSelectedDrug();
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

      console.log(query);

      APIService.aggregateDrugEvent(query, 25, 'patient.reaction.reactionmeddrapt.exact').then(function(resp){
        $scope.setChartData(resp.results);
      },function(error){
        console.log(error);
      });

      query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name+' AND serious:2';
      APIService.aggregateDrugEvent(query, null, null).then(function(resp){
        $scope.nonSeriousCount = resp.meta.results.total;
        createPieChart();
        console.log($scope.nonSeriousCount);
      });

      query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name+' AND serious:1';
      APIService.aggregateDrugEvent(query, null, null).then(function(resp){
        $scope.seriousCount = resp.meta.results.total;
        createPieChart();
        console.log($scope.seriousCount);
      });

      query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name;
      APIService.aggregateDrugEvent(query, null, null).then(function(resp){
        $scope.totalReportedCount = resp.meta.results.total;
        createPieChart();
        console.log($scope.totalReportedCount);
      });

      query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name;
      query += ' AND receivedate:[' + $scope.startDate + ' TO ' + $scope.endDate + ']';
      APIService.getDrugDateReportCount(query, 'receivedate').then(function(resp){
        $scope.dateData = resp.results;
        $scope.countDateArray = [];
        $scope.dateData.map(function(date){
          var arr = [date.time, date.count];
          $scope.countDateArray.push(arr);
        });
        console.log($scope.countDateArray);
        
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
      console.log($scope.filterType);
    };

    $scope.filtersUpdated = function(paramName, paramValue){
      $scope[paramName] = paramValue;
      $scope.searchDrugEvents();
      console.log($scope.seriousness, $scope.dmeCases, $scope.outcome, $scope.age);
    }

    $scope.setChartData = function(data){
      $scope.chart = data;

      var hold = [];
      $scope.effects = [];
      var numbers = [];
      $scope.counts = [{name: "reported Adverse Effects", data: numbers}];
      for (var i in $scope.chart) {
        $scope.effects.push($scope.chart[i].term);
        $scope.counts[0].data.push($scope.chart[i].count);
      }
      createChart();
      $scope.terms = $scope.chart;
    };

      //angular.element(document).ready();
      function createChart() {
        var colors = Highcharts.getOptions().colors;
          $('#chartContainer').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Top 25 Reported Adverse Effects for ' + $scope.selectedDrug.brand_name
            },
            xAxis: {
                categories: $scope.effects
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Counts'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },

            series: $scope.counts

          });

          $('#lineGraphContainer').highcharts({
            chart: {
            type: 'spline'
        },
        title: {
            text: 'Number of Adverse Reports'
        },
        subtitle: {
            text: 'Over Time'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: '# Adverse Reports'
            },
            min: 0
        },
        tooltip: {
            headerFormat: 'Adverse Reports'
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },

        series: [{
            name: "Date",
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            data: $scope.countDateArray
        }]
    });
        };
      function createPieChart() {
        $scope.percentSerious = ($scope.seriousCount / $scope.totalReportedCount) * 100;
      console.log($scope.percentSerious);
      $scope.percentNonSerious = ($scope.nonSeriousCount / $scope.totalReportedCount) * 100;
      console.log($scope.percentNonSerious);
      var totalReportedCount = $scope.totalReportedCount;

      $scope.pieChart = new Highcharts.Chart({
        chart: {
            renderTo: 'totalReportedContainer',
            type: 'pie'
        },
        title: {
          text: 'Total Reported ' + $scope.totalReportedCount
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
    };

  });
