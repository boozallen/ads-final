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

    function initChart(params){
      var results = params.results;
    }

    IntegrationService.registerIntegrationMethod('initChart', initChart);
  });
