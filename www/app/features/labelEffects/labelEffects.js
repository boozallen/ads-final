'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('LabelEffectsCtrl', function ($scope, IntegrationService, APIService, DrugService) {

    var  initLabelEffects = function(params){
      $scope.selectedDrug = DrugService.getSelectedDrug();
      $scope.fetchDrugEffects();
    };

    IntegrationService.registerIntegrationMethod('initLabelEffects', initLabelEffects);

    initLabelEffects();

    $scope.fetchDrugEffects = function(){
      APIService.getDrugEffectApi().get($scope.selectedDrug).then(updateList,serviceError)
    };

    function updateList(resp){

    }

    function serviceError(error){
      console.log(error);
    }

  });
