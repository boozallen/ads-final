'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:LabelEffectsCtrl
 * @description
 * # LabelEffectsCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('LabelEffectsCtrl', function ($scope, $location, $window, IntegrationService, APIService, DrugService) {

    $scope.leaderAdded = false;
    $scope.effects = [];
    $scope.alerts = ['alert'];
    $scope.selectedSymptom = '';
    $scope.adverseEffects = [];
    $scope.displayedStuff = [];
    $scope.percentAnswered = function(){
      return $scope.getPercentage() + '% of possible side effects addressed'
    };

    $scope.$on('scanner-started', function(event, args) {
      $scope.alerts.push(args.message);
    });

    $scope.count = 0;
    $scope.total = 1;

    var initLabelEffects = function (params) {
      $scope.alerts = [];
      $scope.selectedDrug = DrugService.getSelectedDrug();
      $scope.count = 0;
      $scope.total = 1;
      var query = 'patient.drug.medicinalproduct:' + $scope.selectedDrug.brand_name;
      APIService.aggregateDrugEvent(query, 50, 'patient.reaction.reactionmeddrapt.exact').then(addFdaList, serviceError)
      APIService.getLeadersApi().getList().then(function(resp) {
        $scope.leaders = resp;
      });
    };

    IntegrationService.registerIntegrationMethod('initLabelEffects', initLabelEffects);

    $scope.addLeader = function(name){
      var post = {leader: {name: name, zipcode: 11111, count: 5}};
      $scope.newLeader = name;
      APIService.getLeadersApi().post(post).then(function() {
        APIService.getLeadersApi().getList().then(function(resp) {
          $scope.leaders = resp;
          $scope.leaderAdded = true;
        });
      }, serviceError);
    };

    $scope.fetchDrugEffects = function () {
      $scope.adverseEffects = [];
      $scope.displayedStuff = [];

      var drug = DrugService.getSelectedDrugInfo();
      console.log(drug);
      $scope.adverseEffects = drug.effects;
      $scope.total = $scope.adverseEffects.length > 18? 18 : $scope.adverseEffects.length;
      addDisplayedStuff();
    };

    function addFdaList(resp) {
      var res = resp.results;
      for (var i in res) {
        $scope.effects.push(res[i].term);
      }
      $scope.fetchDrugEffects();
    }

    function addDisplayedStuff() {
      var k = genRandomInt(0, $scope.adverseEffects.length);
      var effect = $scope.adverseEffects.splice(k, 1)[0];
      var sentence = findMatchingSentence($scope.selectedDrug.object, effect);
      $scope.displayedStuff.push({effect: effect, sentence: sentence});
    }

    function genRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function serviceError(error) {
    }

    // Function which greps through the drug object to find adverse effects
    function findMatchingSentence(drugObject, effect) {
      //console.log(drugObject);
      var textToSearch = [];

      if (drugObject['boxed_warnings']) {
        textToSearch.push.apply(textToSearch, drugObject['boxed_warnings']);
      }

      if (drugObject['warnings_and_precautions']) {
        textToSearch.push.apply(textToSearch, drugObject['warnings_and_precautions']);
      }

      if (drugObject['user_safety_warnings']) {
        textToSearch.push.apply(textToSearch, drugObject['user_safety_warnings']);
      }

      if (drugObject['precautions']) {
        textToSearch.push.apply(textToSearch, drugObject['precautions']);
      }

      if (drugObject['warnings']) {
        textToSearch.push.apply(textToSearch, drugObject['warnings']);
      }

      if (drugObject['general_precautions']) {
        textToSearch.push.apply(textToSearch, drugObject['general_precautions']);
      }

      if (drugObject['warnings_and_precautions']) {
        textToSearch.push.apply(textToSearch, drugObject['warnings_and_precautions']);
      }

      if (drugObject['adverse_reactions']) {
        textToSearch.push.apply(textToSearch, drugObject['adverse_reactions']);
      }

      var found = false;

      if (Array.isArray(textToSearch)) {
        textToSearch = textToSearch.join('.');
      }

      var splitText = textToSearch.split('.');
      for (var i = 0; i < splitText.length; i++) {
        if (splitText[i].match(effect)) {
          found = true;
          break;
        }
      }

      if (found == true) {
        return (splitText.slice(i-1, i+1).join('.'));
      } else {
        //console.log(textToSearch);
        //console.log(effect);
        return splitText.join('.');
      }
    }

    // Called every time you finish one question
    $scope.completeIndex = function (index, accurate) {
      $scope.count += 1;
      var term = $scope.displayedStuff.splice(index, 1)[0];
      if ($scope.adverseEffects.length > 0) addDisplayedStuff();
      var post = {drug_name: $scope.selectedDrug.brand_name, effect: term.effect, response: accurate};
      APIService.getEffectsApi().post(post).then(serviceError, serviceError);
    };

    $scope.adverseTooltip = "Add a new adverse affect not currently reported";

    $scope.addSelectedSymptom = function () {
      var elem = $('#selsym')[0];
      var value = elem.value;
      if (contains($scope.symptoms, value) && !effectsContain(value)) {
        $scope.effects.push({medical_term: value, layman_term: value, checked: true});
        $scope.selectedSymptom = '';
        elem.value = '';
      }
    };

    $scope.getPercentage = function () {
      var div = $scope.count / $scope.total;
      var percent = div * 100;
      if(percent == 100){
        $scope.showThanks = true;
      }
      return Math.floor(percent);
    };

    function effectsContain(obj) {
      var a = $scope.effects;
      for (var i = 0; i < a.length; i++) {
        if (a[i].medical_term == obj) {
          return true;
        }
      }
      return false;
    }

    function contains(a, obj) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
          return true;
        }
      }
      return false;
    }

    $scope.toAbout = function toAbout() {
      $window.location.href = "/about";
    }
  });
