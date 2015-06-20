'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
