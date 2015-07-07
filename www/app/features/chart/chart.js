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
      $scope.filterType = 'hospitalizations';
      $scope.seriousness = 'all';
      $scope.outcome = 'all';
      $scope.age = 'all';
      $scope.totalReportedCount = 0;
      $scope.percentSerious = 50;
      $scope.percentNonSerious = 50;
      $scope.startDate = 19000101;
      $scope.endDate = 20500101;
      $scope.dateChartData = [];
      $scope.toggleCharts = true;
      $scope.alerts = ['alert'];

      $scope.least = 0;
      $scope.greatest = 100;
    };

    $scope.scrollToLabelAccuracy = function scrollToLabelAccuracy() {
      //console.log('scrolling');
      $('html, body').animate({
        scrollTop: $('#label-accuracy').offset().top - 70
      }, 500);
    };

    $scope.initializePie = function initializePie() {
      var query = 'patient.drug.medicinalproduct:' + $scope.selectedDrug.brand_name + ' AND serious:2';
      APIService.aggregateDrugEvent(query, null, null).then(function (resp) {
        $scope.nonSeriousCount = resp.meta.results.total;
        createPieChart();
      });

      query = 'patient.drug.medicinalproduct:' + $scope.selectedDrug.brand_name + ' AND serious:1';
      APIService.aggregateDrugEvent(query, null, null).then(function (resp) {
        $scope.seriousCount = resp.meta.results.total;
        createPieChart();
      });

      query = 'patient.drug.medicinalproduct:' + $scope.selectedDrug.brand_name;
      APIService.aggregateDrugEvent(query, null, null).then(function (resp) {
        $scope.totalReportedCount = resp.meta.results.total;
        createPieChart();
      });
    };

    var initChart = function () {
      $scope.initializeVariables();
      $scope.selectedDrug = DrugService.getSelectedDrug();
      APIService.getDrugsApi().post({drug: $scope.selectedDrug}).then(function (resp) {
        DrugService.setSelectedDrugInfo(resp.drug);
        IntegrationService.callIntegrationMethod('initLabelEffects', {});
        $scope.drugEffects = resp.effects;
        $scope.setChartData();
        $scope.initializePie();
        $scope.searchDrugEvents();
        $scope.alerts = [];

        $('#headerDiv').css('display', 'block');

        $location.hash('events-reports');
        $anchorScroll();
      }, function (error) {
        $scope.alerts.push(error.data.message);
        $rootScope.$broadcast('alert-fired', {message: error.data.message});
      });
    };

    IntegrationService.registerIntegrationMethod('initChart', initChart);

    $scope.searchDrugEvents = function () {
      var query = 'patient.drug.medicinalproduct:' + $scope.selectedDrug.brand_name;

      if ($scope.seriousness == 'non_serious_adverse_events') {
        query += ' AND serious:2';
      }
      else if ($scope.seriousness == 'serious_adverse_events') {
        query += ' AND serious:1';
      }

      if ($scope.outcome == 'fatal') {
        query += ' AND patient.reaction.reactionoutcome:5';
      }
      else if ($scope.outcome == 'resolving') {
        query += ' AND patient.reaction.reactionoutcome:2';
      }
      else if ($scope.outcome == 'not_recovered_not_resolved') {
        query += ' AND patient.reaction.reactionoutcome:3';
      }
      else if ($scope.outcome == 'recovered_resolved') {
        query += ' AND (patient.reaction.reactionoutcome:4 1)';
      }
      else if ($scope.outcome == 'unknown') {
        query += ' AND patient.reaction.reactionoutcome:6';
      }

      if (this.least > 0 || this.greatest < 100) {
        query += ' AND patient.patientonsetage:[' + this.least + ' TO ' + this.greatest + ']';
      }

      APIService.aggregateDrugEvent(query, 15, 'patient.reaction.reactionmeddrapt.exact').then(function (resp) {
        $scope.setChartData(resp.results, resp.effects);
      }, function (error) {
      });

      query = 'patient.drug.medicinalproduct:' + $scope.selectedDrug.brand_name;
      query += ' AND receivedate:[' + $scope.startDate + ' TO ' + $scope.endDate + ']';
      APIService.getDrugDateReportCount(query, 'receivedate').then(function (resp) {
        $scope.dateData = resp.results;
        $scope.countDateArray = [];
        $scope.dateData.map(function (date) {

          var arr = [parse(date.time), date.count];
          $scope.countDateArray.push(arr);
        });
        createLineChart();

      });
      return true;
    };

    function parse(str) {
      if (!/^(\d){8}$/.test(str)) return 'invalid date';
      var y = str.substr(0, 4),
        m = str.substr(4, 2),
        d = str.substr(6, 2);
      return new Date(y, m, d).getTime();
    }

    $scope.setFilterType = function (filterType) {
      $scope.filterType = filterType;
    };

    $scope.filtersUpdated = function (paramName, paramValue) {
      $scope[paramName] = paramValue;
      $scope.searchDrugEvents();
    };
    $scope.setChartData = function (data) {
      $scope.data = data;

      $scope.chartData = [];
      $scope.chartData.push({
        key: '', color: '#FFFFFF',
        values: []
      });

      for (var i in $scope.data) {
        $scope.chartData[0].values.push({'label': data[i].term.toLowerCase(), 'value': data[i].count})
      }
      $scope.crowdVerified = data;
      $scope.chart = data;

      $scope.effects = [];
      $scope.treeData = [];
      $scope.crowdVerified = [];
      $scope.barLabels = {};
      var numbers = [];
      $scope.counts = [{name: "Reported Adverse Effects", data: numbers}];
      for (var i in $scope.chart) {
        // $scope.crowdVerified.push($scope.chart[i].term.toLowerCase());
        $scope.effects.push($scope.chart[i].term.toLowerCase());
        $scope.counts[0].data.push($scope.chart[i].count);

        if ($scope.drugEffects) {
          if ($scope.chart[i].term.toLowerCase() in $scope.drugEffects.yes_answers) { //is in yes
            if ($scope.chart[i].term.toLowerCase() in $scope.drugEffects.no_answers) { // also in no
              if ($scope.drugEffects.yes_answers[$scope.chart[i].term.toLowerCase()] > $scope.drugEffects.no_answers[$scope.chart[i].term.toLowerCase()]) { // more in yes
                $scope.treeData[$scope.chart[i].term.toLowerCase()] = 2;
              } else if ($scope.drugEffects.yes_answers[$scope.chart[i].term.toLowerCase()] == $scope.drugEffects.no_answers[$scope.chart[i].term.toLowerCase()]) { // equal yes and no votes
                $scope.treeData[$scope.chart[i].term.toLowerCase()]= 0 ;
              } else {
                $scope.treeData[$scope.chart[i].term.toLowerCase()] = 1;
              }
            } else { // not in no
              $scope.treeData[$scope.chart[i].term.toLowerCase()] = 2;
            }
          } else if ($scope.chart[i].term.toLowerCase() in $scope.drugEffects.no_answers) { // in no but not yes
            $scope.treeData[$scope.chart[i].term.toLowerCase()] = 1;
          } else { // in neither
            $scope.treeData[$scope.chart[i].term.toLowerCase()] = 3;
          }
        }
      }

      //console.log($scope.treeData);

      createChart();
      $scope.terms = $scope.chart;

    };

    function createChart() {


      nv.addGraph(function () {
        var chart = nv.models.multiBarHorizontalChart()
          .x(function (d) {
            return d.label
          })
          .y(function (d) {
            return d.value
          })
          .margin({top: 30, right: 20, bottom: 50, left: 175})
          .showValues(false)
          .showControls(false);

        chart.yAxis
          .tickFormat(d3.format(',.0d'));
        chart.groupSpacing(0.4);

        d3.select('#chartContainer svg')
          .datum($scope.chartData)
          .transition().duration(500)

          .call(chart);


        //<foreignObject fill='blue' height='1em' width='1em' dy='1em' x='.5em'><i class='glyphicon glyphicon-envelope'></i></foreignObject>
        //<span class='glyphicon glyphicon-question-sign' style='color:#d3d3d3; font-size: 14px;'></span> : Needs Review
        d3.selectAll('.nv-x').filter('.nv-axis').filter('.nvd3-svg').select('g').selectAll('g').filter('.tick').selectAll('text')
          .attr('transform', 'translate(-30,0)');
        d3.selectAll('.nv-x').filter('.nv-axis').filter('.nvd3-svg').select('g').selectAll('g').filter('.tick').append('foreignObject')
          .attr('transform', 'translate(-30,-8)')
          .attr('height', '1.1em')
          .attr('width', '1em')
          .attr('y', '0.0em')
          .style('display', 'block')
          .attr('x', '.5em').append('xhtml:span')
          .attr('class', function (d) {
            if ($scope.treeData[d] == 0) {
              return 'glyphicon glyphicon-exclamation-sign';
            } else if ($scope.treeData[d] == 1) {
              return 'glyphicon glyphicon-ok-circle';
            } else if ($scope.treeData[d] == 2) {
              return 'glyphicon glyphicon-ok-sign';
            } else if ($scope.treeData[d] == 3) {
              return 'glyphicon glyphicon-question-sign';
            }
          })
          .style('color', function (d) {
            if ($scope.treeData[d] == 0) {
              return '#f8ac59';
            } else if ($scope.treeData[d] == 1) {
              return '#ed5565';
            } else if ($scope.treeData[d] == 2) {
              return '#5bc0de';
            } else if ($scope.treeData[d] == 3) {
              return '#d3d3d3';
            }
          })
          .style('display', 'block')
          .style('font-size', '14px')
          .attr('text', function (d, i) {
            return d;
          });

        d3.selectAll(".nv-bar").filter(".positive")
          .style('fill', '#23b193')
          .style('height', '18');

        nv.utils.windowResize(chart.update);

        return chart;
      });
    }

    function createPieChart() {
    }

    function createLineChart() {
    }

    function createTreeChart() {
    }
  });
