'use strict';

/**
 * @ngdoc function
 * @name gapFront.service:DrugService
 * @description
 * # DrugService
 * Angular Service providing access State Drug data
 */
angular.module('gapFront')
  .service('DrugService', function () {

    var selectedDrug;
    var selectedDrugInfo;

    function setSelectedDrug(drug){
      selectedDrug = drug;
    }

    function getSelectedDrug(){
      return selectedDrug;
    }

    function setSelectedDrugInfo(drug){
      selectedDrugInfo = drug;
    }

    function getSelectedDrugInfo(){
      return selectedDrugInfo;
    }

    return {
      setSelectedDrug:setSelectedDrug,
      getSelectedDrug:getSelectedDrug,
      setSelectedDrugInfo:setSelectedDrugInfo,
      getSelectedDrugInfo:getSelectedDrugInfo
    };
  });
