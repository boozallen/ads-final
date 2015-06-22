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
    $scope.drugs = [];
    $scope.selectedDrug = '';

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.search = {text:''};

    $scope.searchDrugs = function(viewValue){
      console.log($scope.selectedDrug);
      console.log('searchDrugs');
      var text = viewValue;
      //text = text.replace(' ','+');
      var query = 'openfda.generic_name:'+text+' openfda.brand_name:'+text+' openfda.substance_name:'+text;
      console.log(query);
      APIService.queryDrugLabel(query,0,10).then(function(resp){
        $scope.drugs = [];

        for (var i in resp.results) {
          var drug = {
            brand_name: resp.results[i]['openfda']['brand_name'][0],
            generic_name: resp.results[i]['openfda']['generic_name'][0],
            substance_name: resp.results[i]['openfda']['substance_name'][0],
            manufacturer_name: resp.results[i]['openfda']['manufacturer_name'][0]
          };

          $scope.drugs.push(drug);
        }
        console.log($scope.drugs);
        return $scope.drugs;
      },function(){
        console.log('error!');
      });
      return $scope.drugs;
    };


  });
