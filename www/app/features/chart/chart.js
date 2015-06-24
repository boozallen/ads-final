'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('ChartCtrl', function ($scope, IntegrationService, APIService, DrugService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.filterType = "hospitalizations" //
    $scope.seriousness = "all";
    $scope.outcome = "all";
    $scope.age = "all";
    $scope.totalReportedCount = 0;
    $scope.percentSerious = 50;
    $scope.percentNonSerious = 50;

    $scope.least=0;
    $scope.greatest=100;

    var  initChart = function(params){
      $scope.selectedDrug = DrugService.getSelectedDrug();
      $scope.searchDrugEvents();
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

      console.log(query);

      APIService.aggregateDrugEvent(query, 25, 'patient.reaction.reactionmeddrapt.exact').then(function(resp){
        $scope.setChartData(resp.results);
      },function(error){
        console.log(error);
      });

      query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name+' AND serious:2';
      APIService.aggregateDrugEvent(query, null, null).then(function(resp){
        $scope.nonSeriousCount = resp.meta.results.total;
        createPieChart();
        console.log($scope.nonSeriousCount);
      });

      query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name+' AND serious:1';
      APIService.aggregateDrugEvent(query, null, null).then(function(resp){
        $scope.seriousCount = resp.meta.results.total;
        createPieChart();
        console.log($scope.seriousCount);
      });

      query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name;
      APIService.aggregateDrugEvent(query, null, null).then(function(resp){
        $scope.totalReportedCount = resp.meta.results.total;
        createPieChart();
        console.log($scope.totalReportedCount);
      });
      return true;
    };

    $scope.setFilterType = function(filterType){
      $scope.filterType = filterType;
      console.log($scope.filterType);
    };

    $scope.filtersUpdated = function(paramName, paramValue){
      $scope[paramName] = paramValue;
      $scope.searchDrugEvents();
      console.log($scope.seriousness, $scope.dmeCases, $scope.outcome, $scope.age);
    }

    $scope.setChartData = function(data){
      $scope.chart = data;

      var hold = [];
      $scope.effects = [];
      var numbers = [];
      $scope.counts = [{name: "reported Adverse Effects", data: numbers}];
      for (var i in $scope.chart) {
        $scope.effects.push($scope.chart[i].term);
        $scope.counts[0].data.push($scope.chart[i].count);
      }
      createChart();
      $scope.terms = $scope.chart;
    };

      //angular.element(document).ready();
      function createChart() {
        var colors = Highcharts.getOptions().colors;
          $('#chartContainer').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Top 25 Reported Adverse Effects for ' + $scope.selectedDrug.brand_name
            },
            xAxis: {
                categories: $scope.effects
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Counts'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },

            series: $scope.counts

          });
        };
      function createPieChart() {
        $scope.percentSerious = ($scope.seriousCount / $scope.totalReportedCount) * 100;
      console.log($scope.percentSerious);
      $scope.percentNonSerious = ($scope.nonSeriousCount / $scope.totalReportedCount) * 100;
      console.log($scope.percentNonSerious);
        $('#totalReportedContainer').highcharts({
            chart: {
              type: 'pie'
            },
            title: {
              text: 'Total Reported'
            },
            yAxis: {
              title: {
                text: 'Percent Serious'
              }
            },
            plotOptions: {
              pie: {
                shado: false
              }
            },
            tooltip: {
              formatter: function() {
                return '<b>' + this.point.name + '</b>: '+ this.y + ' %';
              }
            },
            series: [{
              name: 'Total Reported',
              data: [["Serious", $scope.percentSerious], ["Non-serious", $scope.percentNonSerious]],
              size: '60%',
              innerSize: '40%',
              showInLegend: true,
              dataLabels: {
                enabled: false
              }
            }]
          });
      }

  });
