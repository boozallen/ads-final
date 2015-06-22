'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('MainCtrl', function ($scope, Restangular, CONSTANTS) {
    $scope.popover = {title: 'Title', content: 'Hello Popover. This is a multiline message!'};

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.drugs = [
      'Advil',
      'Xanax',
      'Diarrhea'
    ];

$scope.selectedState = "";
$scope.states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

$scope.selectedAddress = "";

    Restangular.setBaseUrl('mockJson/api/v1');
		Restangular.all('medicineSearch.json').getList().then(function (response){
			console.log(response);
		});
    // console.log(CONSTANTS.testUrl);
  });
