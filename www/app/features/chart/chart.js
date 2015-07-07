'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:ChartCtrl
 * @description Gathers data for and creates the bar graph, line graph, tree map, and pie chart. Also controlls toggle buttons and filters for each.
 * # ChartCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('ChartCtrl', function ($scope, $filter, IntegrationService, APIService, DrugService, $rootScope, $location, $anchorScroll) {

    $scope.initializeVariables = function initializeVariables() {
      $scope.filterType = "hospitalizations";
      $scope.seriousness = "all";
      $scope.outcome = "all";
      $scope.age = "all";
      $scope.totalReportedCount = 0;
      $scope.percentSerious = 50;
      $scope.percentNonSerious = 50;
      $scope.startDate = 19000101;
      $scope.endDate = 20500101;
      $scope.dateChartData = [];
      $scope.toggleCharts = true;
      $scope.alerts = ['alert'];

      $scope.least=0;
      $scope.greatest=100;
    };

    $scope.scrollToLabelAccuracy = function scrollToLabelAccuracy(){
      //console.log('scrolling');
      $('html, body').animate({
        scrollTop: $("#label-accuracy").offset().top-70
      }, 500);
    };

    $scope.initializePie = function initializePie() {
      var query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name+' AND serious:2';
      APIService.aggregateDrugEvent(query, null, null).then(function(resp){
        $scope.nonSeriousCount = resp.meta.results.total;
        createPieChart();
      });

      query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name+' AND serious:1';
      APIService.aggregateDrugEvent(query, null, null).then(function(resp){
        $scope.seriousCount = resp.meta.results.total;
        createPieChart();
      });

      query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name;
      APIService.aggregateDrugEvent(query, null, null).then(function(resp){
        $scope.totalReportedCount = resp.meta.results.total;
        createPieChart();
      });
    };

    var initChart = function(){
      $scope.initializeVariables();
      $scope.selectedDrug = DrugService.getSelectedDrug();
      APIService.getDrugsApi().post({drug: $scope.selectedDrug}).then(function(resp){
        DrugService.setSelectedDrugInfo(resp.drug);
        IntegrationService.callIntegrationMethod('initLabelEffects',{});
        $scope.drugEffects = resp.effects;
        $scope.setChartData();
        $scope.initializePie();
        $scope.searchDrugEvents();
        $scope.alerts = [];

        $("#headerDiv").css('display', 'block');

        $location.hash('events-reports');
        $anchorScroll();
      }, function(error){
        $scope.alerts.push(error.data.message);
        $rootScope.$broadcast('alert-fired', { message: error.data.message });
      });
    };

    IntegrationService.registerIntegrationMethod('initChart', initChart);

    $scope.searchDrugEvents = function(){
      var query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name;

      if($scope.seriousness == "non_serious_adverse_events"){
        query += ' AND serious:2';
      }
      else if($scope.seriousness == 'serious_adverse_events'){
        query += ' AND serious:1';
      }

      if($scope.outcome == 'fatal'){
        query += ' AND patient.reaction.reactionoutcome:5';
      }
      else if($scope.outcome == 'resolving'){
        query += ' AND patient.reaction.reactionoutcome:2';
      }
      else if($scope.outcome == 'not_recovered_not_resolved'){
        query += ' AND patient.reaction.reactionoutcome:3';
      }
      else if($scope.outcome == 'recovered_resolved'){
        query += ' AND (patient.reaction.reactionoutcome:4 1)';
      }
      else if($scope.outcome == 'unknown'){
        query += ' AND patient.reaction.reactionoutcome:6';
      }

      if(this.least > 0 || this.greatest < 100){
        query += ' AND patient.patientonsetage:['+this.least+' TO ' + this.greatest + ']';
      }

      APIService.aggregateDrugEvent(query, 15, 'patient.reaction.reactionmeddrapt.exact').then(function(resp){
        $scope.setChartData(resp.results, resp.effects);
      },function(error){
      });

      query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name;
      query += ' AND receivedate:[' + $scope.startDate + ' TO ' + $scope.endDate + ']';
      APIService.getDrugDateReportCount(query, 'receivedate').then(function(resp){
        $scope.dateData = resp.results;
        $scope.countDateArray = [];
        $scope.dateData.map(function(date){

          var arr = [parse(date.time), date.count];
          $scope.countDateArray.push(arr);
        });
        createLineChart();

      });
      return true;
    };

    function parse(str) {
      if(!/^(\d){8}$/.test(str)) return "invalid date";
      var y = str.substr(0,4),
        m = str.substr(4,2),
        d = str.substr(6,2);
      return new Date(y,m,d).getTime();
    }

    $scope.setFilterType = function(filterType){
      $scope.filterType = filterType;
    };

    $scope.filtersUpdated = function(paramName, paramValue){
      $scope[paramName] = paramValue;
      $scope.searchDrugEvents();
    };

    $scope.setChartData = function(data){
    };


    function createChart() {
    }

    function createPieChart() {
    }

    function createLineChart() {
    }

    function createTreeChart(){
    }
  });
