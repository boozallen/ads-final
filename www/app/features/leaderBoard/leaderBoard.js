  'use strict';

<<<<<<< Updated upstream
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
=======
  /**
   * @ngdoc function
   * @name gapFront.controller:LeaderBoardCtrl
   * @description A simple controller to update leader board.
   * # LeaderBoardCtrl
   * Controller of the gapFront
   */
  angular.module('gapFront')
    .controller('LeaderBoardCtrl', function ($scope, APIService) {
      APIService.getLeaderBoard().then(function(resp) {
        $scope.leaders = resp;
      });
      // $scope.leaders = ["Steve S.", "Jason P.", "Sami M.", "Sameer D.", "Fred J.", "George B.", "Shelly R."];
    });
>>>>>>> Stashed changes
