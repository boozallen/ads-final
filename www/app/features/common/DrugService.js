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
    var alerts;

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

    function setAlerts(selectedAlerts){
      alerts = selectedAlerts;
    }

    function getAlerts(){
      return alerts;
    }

    return {
      setSelectedDrug:setSelectedDrug,
      getSelectedDrug:getSelectedDrug,
      setSelectedDrugInfo:setSelectedDrugInfo,
      getSelectedDrugInfo:getSelectedDrugInfo,
      setAlerts:setAlerts,
      getAlerts:getAlerts
    };
  });
