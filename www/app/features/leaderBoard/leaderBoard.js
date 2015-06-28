'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:LeaderBoardCtrl
 * @description A simple controller to update leader board.
 * # LeaderBoardCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('LeaderBoardCtrl', function ($scope, APIService, IntegrationService) {
    console.log('in leaderboard');

    IntegrationService.registerIntegrationMethod('initLeaderBoard', initLeaderBoard);

    var initLeaderBoard = function(params){
      $scope.selectedDrug = DrugService.getSelectedDrug();

      APIService.getLeadersApi().getList().then(function(resp) {
        $scope.leaders = resp;
      });

    };

    APIService.getLeadersApi().getList().then(function(resp) {
      $scope.leaders = resp;
    });



    $scope.addLeader = function(firstName, lastName, zipcode){
      var post = {name: firstName + ' ' +  lastName, total: 5, zipcode: zipcode};
      console.log(post);
      console.log("Adding leader");
      APIService.getLeadersApi().post(post).then(serviceError, serviceError);
    };

    function serviceError(error) {
      console.log(error);
    }

    // $scope.leaders = ["Steve S.", "Jason P.", "Sami M.", "Sameer D.", "Fred J.", "George B.", "Shelly R."];
});
