(function() {
  'use strict';

  angular.module('gapFront')
    .controller('MainCtrl', MainController);

  /**
   * @ngdoc function
   * @name gapFront.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the gapFront
   */
  function MainController($scope, $state, APIService) {
    var vm = this;

    vm.setSelectedDrug = setSelectedDrug;

    APIService.queryDrugLabel().then(setTotalLabels, serviceError);
    APIService.queryDrugEvent().then(setTotalEvents, serviceError);

    function setSelectedDrug(drug) {
      $state.go('drug-info');
    }

    function setTotalLabels(resp) {
      $scope.totalLabels = resp.meta.results.total;
    }

    function setTotalEvents(resp) {
      $scope.totalEvents = resp.meta.results.total;
    }

    function serviceError(error) {
      console.error(error);
    }
  }
})();
