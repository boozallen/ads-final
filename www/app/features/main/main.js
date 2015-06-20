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
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    Restangular.setBaseUrl('http://localhost:9000/mockJson/api/v1');
		Restangular.all('medicineSearch.json').getList().then(function (response){
			console.log(response);

		});
    // console.log(CONSTANTS.testUrl);
  });
