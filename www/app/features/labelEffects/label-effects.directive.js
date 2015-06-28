(function() {
  'use strict';

  angular.module('gapFront')
    .directive('labelEffects', LabelEffectsDirective);

  /** @ngInject */
  function LabelEffectsDirective() {
    var directive = {
      restrict: 'AE',
      scope: {},
      link: link,
      templateUrl: 'features/labelEffects/label-effects.html',
      controller: LabelEffectsController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function link(scope, element, attrs, vm, transclude) {
      vm.activate();
    }

    /** @ngInject */
    function LabelEffectsController($rootScope, $timeout, APIService, DrugService) {
      var vm = this;

      vm.count = 0;
      vm.total = 0;
      vm.effects = [];
      vm.adverseEffects = [];
      vm.displayedStuff = [];

      vm.activate = activate;
      vm.getPercentage = getPercentage;
      vm.completeIndex = completeIndex;

      function activate() {
        initData();
        $rootScope.$on('drug.selected', initData);
      }

      function getPercentage() {
        if (0 == vm.count || 0 == vm.total) {
          return '0';
        }

        return Math.floor(vm.count / vm.total * 100);
      }

      // Called every time you finish one question
      function completeIndex(index, accurate) {
        var term = vm.displayedStuff.splice(index, 1)[0];
        var post = {drug_name: vm.drug.brand_name, effect: term.effect, response: accurate};

        vm.count += 1;
        if (vm.adverseEffects.length > 0) {
          addDisplayedStuff();
        }
        APIService.getEffectsApi().post(post).then(handleResults, serviceError);

        function handleResults() {
        }

        function serviceError(error) {
          console.error(error);
        }
      }

      function initData() {
        vm.drug = DrugService.getSelectedDrug();

        var query = 'patient.drug.medicinalproduct:' + vm.drug.brand_name;

        vm.count = 0;
        vm.total = 0;
        vm.effects = [];
        vm.adverseEffects = [];
        vm.displayedStuff = [];

        APIService.aggregateDrugEvent(query, 50, 'patient.reaction.reactionmeddrapt.exact')
          .then(addFdaList, serviceError);

        function addFdaList(data) {
          vm.effects.length = 0;
          angular.forEach(data.results, function(effect) {
            vm.effects.push(effect.term);
          });
          fetchDrugEffects();
        }

        function serviceError(error) {
          console.error(error);
        }
      }

      function fetchDrugEffects() {
        var info = DrugService.getSelectedDrugInfo();

        vm.adverseEffects = info.drug.effects;
        vm.total = vm.adverseEffects.length;

        addDisplayedStuff();
      }

      function addDisplayedStuff() {
        var k = _.random(0, vm.adverseEffects.length - 1);
        var effect = vm.adverseEffects.splice(k, 1)[0];
        var sentence = findMatchingSentence(vm.drug.object, effect);

        vm.displayedStuff.push({effect: effect, sentence: sentence});
        $timeout(function() {
          $('#adverseSentence').unhighlight().highlight(effect);
        }, 250);
      }

      // Function which greps through the drug object to find adverse effects
      function findMatchingSentence(drugObject, effect) {
        var keys = ['boxed_warnings', 'warnings_and_precautions',
          'user_safety_warnings', 'precautions', 'warnings',
          'general_precautions', 'warnings_and_precautions', 'adverse_reactions'];
        var textToSearch = [];

        angular.forEach(keys, function(key) {
          if (drugObject[key]) {
            textToSearch.push(drugObject[key]);
          }
        });

        var splitText = textToSearch.join('. ').split('. ');
        var index = _.findIndex(splitText, function(sentence) {
          return sentence.match(effect);
        });

        if (-1 == index) {
          // Not found: Return a random chunk of text
          index = _.random(0, splitText.length);
        }

        return splitText.slice(Math.max(index - 1, 0), Math.min(splitText.length, index + 1)).join('. ');
      }
    }
  }
})();
