'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
