'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('HeaderCtrl', function($scope, $location) {
    $scope.about = $location.path();
  });
