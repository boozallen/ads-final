(function() {
  'use strict';

  angular.module('gapFront')
    .service('DrugService', DrugService);

  /**
   * @ngdoc function
   * @name gapFront.service:DrugService
   * @description
   * # DrugService
   * Angular Service providing access State Drug data
   */
  function DrugService() {
    var selectedDrug;
    var selectedDrugInfo;

    return {
      setSelectedDrug: setSelectedDrug,
      getSelectedDrug: getSelectedDrug,
      setSelectedDrugInfo: setSelectedDrugInfo,
      getSelectedDrugInfo: getSelectedDrugInfo
    };

    function setSelectedDrug(drug) {
      selectedDrug = drug;
    }

    function getSelectedDrug() {
      return selectedDrug;
    }

    function setSelectedDrugInfo(drug) {
      selectedDrugInfo = drug;
    }

    function getSelectedDrugInfo() {
      return selectedDrugInfo;
    }
  }
})();
