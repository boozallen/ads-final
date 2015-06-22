'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('MainCtrl', function ($scope, APIService) {
    $scope.popover = {title: 'Title', content: 'Hello Popover. This is a multiline message!'};

    $scope.results = [];

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.search = {text:''};

    $scope.searchDrugs = function(){
      console.log('searchDrugs');
      var text = $scope.search.text;
      //text = text.replace(' ','+');
      var query = 'openfda.generic_name:'+text+' openfda.brand_name:'+text+' openfda.substance_name:'+text;
      console.log(query);
      APIService.queryDrugLabel(query,0,10,function(resp){
        console.log(resp.results);
        $scope.results = resp.results;
      },function(){
        console.log('error!');
      })
    }

  });
