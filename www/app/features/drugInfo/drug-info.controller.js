(function() {
  'use strict';

  angular.module('gapFront')
    .controller('DrugInfoController', DrugInfoController);

  /** @ngInject */
  function DrugInfoController($rootScope, $state, DrugService) {
    var vm = this;

    vm.setSelectedDrug = setSelectedDrug;

    activate();

    function activate() {
      vm.drug = DrugService.getSelectedDrug();
      if (!vm.drug) {
        $state.go('main');
      }
      vm.modal = {};
    }

    function setSelectedDrug(drug) {
      vm.drug = drug;
      $rootScope.$emit('drug.selected');
    }
  }
})();
