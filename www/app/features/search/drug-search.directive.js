(function() {
  'use strict';

  angular.module('gapFront')
    .directive('drugSearch', DrugSearchDirective);

  /** @ngInject */
  function DrugSearchDirective() {
    var directive = {
      restrict: 'AE',
      scope: {
        term: '@?',
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
    function DrugSearchController(APIService, DrugService) {
      var vm = this;

      vm.options = [];

      vm.activate = activate;
      vm.search = _.debounce(search, 250, {leading: true, trailing: true});
      vm.selectedDrug = selectedDrug;

      function activate() {
        vm.drug = vm.term || '';
      }

      function search() {
        // Avoid searching with the object after drug selection.
        if ('' == vm.drug) {
          vm.options.length = 0;
          return;
        }

        APIService.queryDrugLabel('openfda.brand_name:'+vm.drug, 0, 10).then(processLabelResults, serviceError);

        function processLabelResults(data) {
          vm.options.length = 0;
          angular.forEach(data.results, rebuildDrugList);
          vm.options.sort(sortDrugs);
        }

        function serviceError(error) {
          vm.options.length = 0;
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
          if (a.lowercase_name > b.lowercase_name) {
            return 1;
          }
          if (b.lowercase_name > a.lowercase_name) {
            return -1;
          }

          return 0;
        }
      }

      function selectedDrug(drug) {
        vm.options.length = 0;
        APIService.getDrugsApi().get(drug.brand_name).then(handleResult);

        function handleResult(result) {
          DrugService.setSelectedDrugInfo(result);
          DrugService.setSelectedDrug(drug);
          vm.onSelected({drug: drug});
        }
      }
    }
  }
})();
