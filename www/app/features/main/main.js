'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('MainCtrl', function ($scope, $location, $route, APIService, IntegrationService, DrugService) {
    $scope.drugs = [];

    $scope.searchText = '';
    $scope.searchFixed = '';
    $scope.alerts = [];

    $(window).bind('scroll', function() {
        var $elem = $("#searchValue");
        var eventsReportTop = $("#events-reports").top;
        var $window = $(window);

        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();

        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height();

        if((elemBottom <= docViewBottom) && (elemTop >= docViewTop)){
          console.log('hide it');
          $("#fixedSearch").css("display", "none");
          $("#footerDiv").css("display", "none");
        }
        else{
          console.log('show it');
          $("#fixedSearch").css("display", "block");
          $("#footerDiv").css("display", "block");
        }
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    });


    var lastRoute = $route.current;
    $scope.$on('$locationChangeSuccess', function(event) {
        $route.current = lastRoute;
    });

    $scope.$on('scanner-started', function(event, args) {
      $scope.alerts.push(args.message);
      $("#fixedSearch").css("display", "none");
      $scope.searchText = '';
    });

    $scope.setSelectedDrug = function(drug) {
      $("#fixedSearch").css("display","block");
      $scope.drugs = [];
      $scope.alerts = [];
      $scope.selectedDrug = drug;

      $location.hash('');

      DrugService.setSelectedDrug($scope.selectedDrug);
      IntegrationService.callIntegrationMethod('initChart',{});
    };

    $scope.searchDrugs = function() {
      //console.log($scope.searchFixed);
      var bla = $scope.searchFixed;

      if(bla){
        //console.log('second');
        $scope.drugs = [];
        //console.log('here');
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
      //console.log(error);
    }

    $scope.setTotalLabels = function setTotalLabels(resp){
      $scope.totalLabels = resp.meta.results.total;
    };

    $scope.setTotalEvents = function setTotalEvents(resp){
      $scope.totalEvents = resp.meta.results.total;
    };

    $scope.modal = {
      title: "Manufacturer Details for: ",
      content: "Hello Modal<br>This is a multiline message!"
    };

    APIService.queryDrugLabel().then($scope.setTotalLabels, serviceError);
    APIService.queryDrugEvent().then($scope.setTotalEvents, serviceError);

  });
