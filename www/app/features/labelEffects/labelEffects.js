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
    $scope.leaderAlerts = [];
    $scope.alerts = ['alert'];
    $scope.selectedSymptom = '';
    $scope.adverseEffects = [];
    $scope.displayedStuff = [];
    $scope.selectedDrug = DrugService.getSelectedDrug;
    $scope.percentAnswered = function(){
      return $scope.getPercentage() + '% of possible side effects addressed'
    };

    $scope.$on('alert-fired', function(event, args) {
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

    $scope.getDocRef = function getDocRef() {
      return window.location.protocol + "//" + window.location.hostname + ":3000/documentation/";
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
      }, function(error) {
        $scope.leaderAlerts.push.apply($scope.leaderAlerts, error.data.messages);
      });
    };

    $scope.fetchDrugEffects = function () {
      $scope.adverseEffects = [];
      $scope.displayedStuff = [];

      var drug = DrugService.getSelectedDrugInfo();
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

      if (drugObject['warnings_and_cautions']) {
        textToSearch.push.apply(textToSearch, drugObject['warnings_and_cautions']);
      }

      if (drugObject['adverse_reactions']) {
        textToSearch.push.apply(textToSearch, drugObject['adverse_reactions']);
      }

      var found = false;

      if (Array.isArray(textToSearch)) {
        textToSearch = textToSearch.join('.');
      }

      var words = textToSearch.split(' ');
      effect = effect.split(' ');

      for (var i = 0; i < words.length; i++) {
        var loc = words[i].indexOf(effect[0]);
        if (loc > -1) {
          if (!effect[1]) {
            found = true;
            break;
          } else {
            if (words[loc + 1].indexOf(effect[1] > -1)) {
              if (!effect[2]) {
                found = true;
                break;
              } else {
                if (words[loc + 2].indexOf(effect[2] > -1)) {
                  found = true;
                  break;
                }
              }
            }
          }
        }
      }

      //console.log(found);
      if (found == true) {
        return (words.slice(Math.max(i-50, 0), Math.min(i+50, words.length)).join(' '));
      } else {
        return words.join(' ');
      }
    }

    $scope.searchDrug = function(drug) {
      IntegrationService.callIntegrationMethod('searchDrug', {drug: drug})
    };

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
