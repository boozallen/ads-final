'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('MainCtrl', function ($scope, $anchorScroll, $location, $route, APIService, IntegrationService, DrugService) {
    $scope.drugs = [];

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
      $anchorScroll('#events-reports');
      $scope.drugs = [];
      $scope.selectedDrug = drug;

      DrugService.setSelectedDrug($scope.selectedDrug);
      IntegrationService.callIntegrationMethod('initChart',{});
      IntegrationService.callIntegrationMethod('initLabelEffects',{});
      $("#headerDiv").css('display', 'block');
      // $("#searchSplashScreen").remove();
      // $location.hash('events-reports');
      // $anchorScroll();
    };

    $scope.searchDrugs = function() {
      var bla = $('#searchTextResultView').val();

      if(bla){
        $scope.drugs = [];
        var text = bla;
      }
      else{
        var text = $scope.searchText;
      }

      if (text) {
        var query = 'openfda.generic_name:' + text + ' openfda.brand_name:' + text + ' openfda.substance_name:' + text;
        APIService.queryDrugLabel(query, 0, 10).then(processLabelResults, serviceError);
      } else {
        $scope.drugs = [];
      }
    };

    function processLabelResults(resp) {
      $scope.drugs = [];
      for (var i in resp.results) {
        if (resp.results[i]['openfda']['brand_name']){
          var drug = {
            brand_name: resp.results[i]['openfda']['brand_name'][0],
            generic_name: resp.results[i]['openfda']['generic_name'][0],
            lowercase_name: resp.results[i]['openfda']['brand_name'][0].toLowerCase(),
            substance_name: resp.results[i]['openfda']['substance_name'] ? resp.results[i]['openfda']['substance_name'][0] : '',
            effective_time: resp.results[i]['effective_time'] ? resp.results[i]['effective_time'] : '0',
            manufacturer_name: resp.results[i]['openfda']['manufacturer_name'][0],
            object: resp.results[i]
          };
        }
        $scope.drugs.push(drug);
      }

      //console.log($scope.drugs);
      $scope.drugs.sort(function (a, b) {
        return a['effective_time'] + b['effective_time'];
      });

      var new_drugs = [];

      for (var j in $scope.drugs) {
        var isDuplicate = false;
        for (var k in new_drugs) {
          if (new_drugs[k]['lowercase_name'] == $scope.drugs[j][['lowercase_name']]) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          new_drugs.push($scope.drugs[j]);
        }
      }


      $scope.drugs = new_drugs;

      return $scope.drugs;
    }

    function serviceError(error) {
      console.log(error);
    }

    function setTotalLabels(resp){
      $scope.totalLabels = resp.meta.results.total;
    }

    function setTotalEvents(resp){
      $scope.totalEvents = resp.meta.results.total;
    }

    $scope.modal = {
      title: "Manufacturer Details for: ",
      content: "Hello Modal<br>This is a multiline message!"
    };

    APIService.queryDrugLabel().then(setTotalLabels, serviceError);
    APIService.queryDrugEvent().then(setTotalEvents, serviceError);

  });
