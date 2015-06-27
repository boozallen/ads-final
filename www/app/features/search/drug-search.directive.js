(function() {
  'use strict';

  angular.module('gapFront')
    .directive('drugSearch', DrugSearchDirective);

  /** @ngInject */
  function DrugSearchDirective() {
    var directive = {
      restrict: 'AE',
      scope: {
        onSelected: '&'
      },
      link: link,
      templateUrl: 'features/search/drug-search.html',
      controller: DrugSearchController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function link(scope, element, attrs, vm, transclude) {
      vm.activate();
    }

    /** @ngInject */
    function DrugSearchController($scope, DrugService, IntegrationService, APIService) {
      var vm = this;

      vm.drug = '';
      vm.options = [];

      vm.activate = activate;
      vm.search = _.debounce(search, 250, {leading: true, trailing: true});
      vm.selectedDrug = selectedDrug;

      function activate() {
        $scope.$on('$typeahead.select', selectedDrug);
      }

      function search() {
        // Avoid searching with the object after drug selection.
        if (!_.isString(vm.drug)) {
          return;
        }

        APIService.queryDrugLabel(vm.drug, 0, 10).then(processLabelResults, serviceError);

        function processLabelResults(data) {
          vm.options.length = 0;
          angular.forEach(data.results, rebuildDrugList);
          vm.options.sort(sortDrugs);
        }

        function serviceError(error) {
          console.error(error);
        }

        function rebuildDrugList(drug) {
          // SKIP: Malformed drug data
          if (!drug.openfda.brand_name) {
            return;
          }

          // SKIP: Duplicate drug names
          if (_.find(vm.options, {lowercase_name: drug.openfda.brand_name[0].toLowerCase()})) {
            return;
          }

          vm.options.push({
            brand_name: drug.openfda.brand_name[0],
            generic_name: drug.openfda.generic_name[0],
            lowercase_name: drug.openfda.brand_name[0].toLowerCase(),
            substance_name: drug.openfda.substance_name ? drug.openfda.substance_name[0] : '',
            effective_time: drug.effective_time ? parseInt(drug.effective_time, 10) : 0,
            manufacturer_name: drug.openfda.manufacturer_name[0],
            object: drug
          });
        }

        function sortDrugs(a, b) {
          if (a.effective_time > b.effective_time) {
            return -1;
          }
          if (b.effective_time > a.effective_time) {
            return 1;
          }

          return 0;
        }
      }

      function selectedDrug(event, value, index) {
        DrugService.setSelectedDrug(vm.drug);
        IntegrationService.callIntegrationMethod('initChart', {});
        IntegrationService.callIntegrationMethod('initLabelEffects', {});
      }
    }
  }
})();
