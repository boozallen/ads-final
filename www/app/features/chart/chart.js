'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('ChartCtrl', function ($scope, IntegrationService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var  initChart = function(params){
      $scope.salesData = params.results;

      console.log(JSON.stringify($scope.salesData));
      var hold = [];
      $scope.effects = [];
      $scope.counts = [];
      for (var i in $scope.salesData) {
        $scope.effects.push($scope.salesData[i].term);
        $scope.counts.push($scope.salesData[i].count);
      };
      console.log($scope.effects);
      console.log($scope.counts);

      createChart();
      $scope.terms = $scope.salesData;
    };

    IntegrationService.registerIntegrationMethod('initChart', initChart);


$scope.salesData=[
        {hour: 1,sales: 54},
        {hour: 2,sales: 66},
        {hour: 3,sales: 77},
        {hour: 4,sales: 70},
        {hour: 5,sales: 60},
        {hour: 6,sales: 63},
        {hour: 7,sales: 55},
        {hour: 8,sales: 47},
        {hour: 9,sales: 55},
        {hour: 10,sales: 30}
    ];

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
