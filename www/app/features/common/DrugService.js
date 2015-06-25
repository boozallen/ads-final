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

    function setSelectedDrug(drug){
      selectedDrug = drug;
    }

    function getSelectedDrug(){
      return selectedDrug;
    }

    return {
      setSelectedDrug:setSelectedDrug,
      getSelectedDrug:getSelectedDrug
    };
  });
