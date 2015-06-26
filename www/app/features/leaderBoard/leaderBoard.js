'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:LeaderBoardCtrl
 * @description
 * # LeaderBoardCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('LeaderBoardCtrl', function ($scope, APIService) {
    getLeadersApi().then(function(resp){
      console.log(resp);
    });
  });
