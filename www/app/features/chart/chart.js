'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('ChartCtrl', function ($scope, IntegrationService, APIService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var  initChart = function(params){
      console.log(params);
      $scope.selectedDrug = params.selectedDrug;
      $scope.searchDrugEvents();
    };

    IntegrationService.registerIntegrationMethod('initChart', initChart);

    $scope.searchDrugEvents = function(){
      var query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name;
      console.log(query);
      APIService.aggregateDrugEvent(query, 50, 'patient.reaction.reactionmeddrapt.exact').then(function(resp){
        $scope.setChartData(resp.results);
      },function(){
        console.log('error!');
      });
      return true;
    };

    $scope.setChartData = function(data){
      $scope.chart = data;

      console.log(JSON.stringify($scope.chart));
      var hold = [];
      $scope.effects = [];
      var numbers = [];
      $scope.counts = [{name: "reported Adverse Effects", data: numbers}];
      for (var i in $scope.chart) {
        $scope.effects.push($scope.chart[i].term);
        $scope.counts[0].data.push($scope.chart[i].count);
      }
      console.log($scope.effects);
      console.log($scope.counts);

      createChart();
      $scope.terms = $scope.chart;
    };

      //angular.element(document).ready();
      function createChart() {
        console.log($('#container'));

          $('#container').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Stacked bar chart'
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
        };

  });
