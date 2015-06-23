'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('MainCtrl', function ($scope, $anchorScroll, $location, $route, APIService, IntegrationService) {
    $scope.drugs = [];
    $scope.selectedDrug = {};

    $scope.searchText = '';

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var lastRoute = $route.current;
    $scope.$on('$locationChangeSuccess', function(event) {
        $route.current = lastRoute;
    });

    $scope.setSelectedDrug = function(drug) {
      $scope.selectedDrug = drug;
      $scope.drugs = [];
      IntegrationService.callIntegrationMethod('initChart',{selectedDrug:$scope.selectedDrug});
      //searchDrugEvents();
      console.log($scope.drugs);
          $location.hash('events-reports');
          $anchorScroll();
    };

    $scope.searchDrugs = function() {
      console.log('searchDrugs');
      var text = $scope.searchText;
      //text = text.replace(' ','+');

      if (text) {
        var query = 'openfda.generic_name:' + text + ' openfda.brand_name:' + text + ' openfda.substance_name:' + text;
        console.log(query);
        APIService.queryDrugLabel(query, 0, 10).then(function (resp) {
          $scope.drugs = [];
          for (var i in resp.results) {
            if (resp.results[i]['openfda']['brand_name']){
              console.log(resp.results[i]);
              var drug = {
                brand_name: resp.results[i]['openfda']['brand_name'][0],
                generic_name: resp.results[i]['openfda']['generic_name'][0],
                substance_name: resp.results[i]['openfda']['substance_name'] ? resp.results[i]['openfda']['substance_name'][0] : '',
                manufacturer_name: resp.results[i]['openfda']['manufacturer_name'][0],
                object: resp.results[i]
              };
            }
            $scope.drugs.push(drug);
          }
          return $scope.drugs;
        }, function () {
          console.log('error!');
        });
      } else {
        $scope.drugs = [];
      }
    };



  });
