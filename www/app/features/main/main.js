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
    Restangular.setBaseUrl('mockJson/api/v1');
		Restangular.all('medicineSearch.json').getList().then(function (response){
			console.log(response);

		});
    // console.log(CONSTANTS.testUrl);
  });
