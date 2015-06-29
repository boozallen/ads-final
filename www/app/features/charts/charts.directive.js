(function() {
  'use strict';

  angular.module('gapFront')
    .directive('charts', ChartsDirective);

  /** @ngInject */
  function ChartsDirective() {
    var directive = {
      restrict: 'AE',
      scope: {},
      link: link,
      templateUrl: 'features/charts/charts.html',
      controller: ChartsController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function link(scope, element, attrs, vm, transclude) {
      vm.activate();
    }

    /** @ngInject */
    function ChartsController($rootScope, $q, $filter, APIService, DrugService) {
      var vm = this;

      var startDate = 19000101;
      var endDate = 20500101;

      vm.viewMode = 'charts';
      vm.seriousness = 'all';
      vm.outcome = 'all';
      vm.ageMin = 0;
      vm.ageMax = 100;
      vm.counts = [{name: "Reported Adverse Effects", data: []}];
      vm.effects = [];
      vm.treeData = [];
      vm.crowdVerified = [];
      vm.countDateArray = [];

      vm.activate = activate;
      vm.searchDrugEvents = searchDrugEvents;
      vm.setSeriousness = setSeriousness;
      vm.setOutcome = setOutcome;

      function activate() {
        Highcharts.setOptions({
          colors: ['#23b193', '#bde2d9']
        });
        initData();
        $rootScope.$on('drug.selected', initData);
      }

      function setSeriousness(value) {
        vm.seriousness = value;
        searchDrugEvents();
      }

      function setOutcome(value) {
        vm.outcome = value;
        searchDrugEvents();
      }

      function searchDrugEvents() {
        var query = ['patient.drug.medicinalproduct:' + vm.drug.brand_name];

        switch (vm.seriousness) {
          case 'non_serious_adverse_events':
            query.push('AND serious:2');
            break;
          case 'serious_adverse_events':
            query.push('AND serious:1');
            break;
        }

        switch (vm.outcome) {
          case 'fatal':
            query.push('AND patient.reaction.reactionoutcome:5');
            break;
          case 'resolving':
            query.push('AND patient.reaction.reactionoutcome:2');
            break;
          case 'not_recovered_not_resolved':
            query.push('AND patient.reaction.reactionoutcome:3');
            break;
          case 'recovered_resolved':
            query.push('AND (patient.reaction.reactionoutcome:4 1)');
            break;
          case 'unknown':
            query.push('AND patient.reaction.reactionoutcome:6');
            break;
        }

        if (vm.ageMin > 0 || vm.ageMax < 100) {
          query.push('AND patient.patientonsetage:[' + vm.ageMin + ' TO ' + vm.ageMax + ']');
        }

        var reportQuery = 'patient.drug.medicinalproduct:' + vm.drug.brand_name + ' AND receivedate:[' + startDate + ' TO ' + endDate + ']';

        $q.all([
          APIService.aggregateDrugEvent(query.join(' '), 15, 'patient.reaction.reactionmeddrapt.exact'),
          APIService.aggregateDrugEvent('patient.drug.medicinalproduct:' + vm.drug.brand_name + ' AND serious:2', null, null),
          APIService.aggregateDrugEvent('patient.drug.medicinalproduct:' + vm.drug.brand_name + ' AND serious:1', null, null),
          APIService.aggregateDrugEvent('patient.drug.medicinalproduct:' + vm.drug.brand_name, null, null),
          APIService.getDrugDateReportCount(reportQuery, 'receivedate')
        ]).then(handleResults);

        function handleResults(results) {
          setChartData(results[0].results);
          vm.nonSeriousCount = results[1].meta.results.total;
          vm.seriousCount = results[2].meta.results.total;
          vm.totalReportedCount = results[3].meta.results.total;
          vm.dateData = results[4].results;
          vm.countDateArray.length = 0;
          angular.forEach(vm.dateData, function(date) {
            vm.countDateArray.push([moment(date.time, 'YYYYMMDD'), date.count]);
          });
          createPieChart();
          createLineChart();
        }
      }

      function initData() {
        vm.drug = DrugService.getSelectedDrug();
        vm.drugEffects = DrugService.getSelectedDrugInfo().effects;
        searchDrugEvents();
      }

      // Private

      function setChartData(data) {
        vm.chart = data;

        vm.effects.length = 0;
        vm.treeData.length = 0;
        vm.counts[0].data.length = 0;

        angular.forEach(data, function(effect) {
          var effectName = effect.term.toLowerCase();

          vm.effects.push(effectName);
          vm.counts[0].data.push(effect.count);

          if (vm.drugEffects) {
            if (vm.drugEffects.answers[effectName]) {
              var answers = vm.drugEffects.answers[effectName];
              if (answers.yes > answers.no) {
                vm.treeData.push({name: effectName, value: effect.count, colorValue: 2});
              } else if (answers.yes == answers.no) {
                vm.treeData.push({name: effectName, value: effect.count, colorValue: 0});
              } else {
                vm.treeData.push({name: effectName, value: effect.count, colorValue: 1});
              }
            } else {
              vm.treeData.push({name: effectName, value: effect.count, colorValue: 0});
            }
          }
        });

        createChart();
        createTreeChart();
        vm.terms = vm.chart;
      }

      function createChart() {
        var $container = $('#chartContainer');
        var chartContainerWidth = $container.width();

        $container.highcharts({
          exporting: {
            enabled: false
          },
          chart: {
            type: 'bar'
          },
          title: {
            text: 'Top 25 Reported Adverse Effects for ' + vm.drug.brand_name,
            style: {
              color: '#333',
              fontWeight: 'normal',
              fontSize: 14,
            }
          },
          xAxis: [{
            tickWidth: 0,
            lineWidth: 0,
            categories: vm.effects,
            labels: {
              x: chartContainerWidth * (5 / 11),
              useHTML: true,
              formatter: function() {
              }
            }
          }, {
            linkedTo: 0,
            categories: vm.effects
          }],
          yAxis: {
            min: 0,

            title: {
              text: 'Counts'
            },
            lineColor: '#666666'
          },
          legend: {
            reversed: true
          },
          plotOptions: {
            series: {
              stacking: 'normal'
            }
          },
          rangeSelector: {
            selected: 1,
            inputEnabled: $container.height() > 480
          },
          series: vm.counts
        });
      }

      function createPieChart() {
        vm.percentSerious = (vm.seriousCount / vm.totalReportedCount) * 100;
        vm.percentNonSerious = (vm.nonSeriousCount / vm.totalReportedCount) * 100;

        vm.pieChart = new Highcharts.Chart({
          exporting: {
            enabled: false
          },
          chart: {
            renderTo: 'totalReportedContainer',
            type: 'pie'
          },
          title: {
            text: 'Total Reported ' + $filter('number')(vm.totalReportedCount),
            style: {
              color: '#333',
              fontWeight: 'normal',
              fontSize: 14,
              align: "left"
            }

          },
          plotOptions: {
            pie: {
              innerSize: '60%'
            }
          },
          series: [{
            data: [
              ["Serious", vm.percentSerious],
              ["Non-serious", vm.percentNonSerious]
            ]
          }]
        });
      }

      function createLineChart() {
        var data = Highcharts.map(vm.countDateArray, function(config) {
          return {
            x: config[0].valueOf(),
            y: config[1]
          };
        });

        var dataObject = {
          exporting: {
            enabled: false
          },
          rangeSelector: {
            selected: 1,
            inputEnabled: $('#container').width() > 480
          },

          title: {
            text: 'Reported Adverse Event Counts Over Time',
            style: {
              color: '#333',
              fontWeight: 'normal',
              fontSize: 14,
              align: "left"
            }
          },

          series: [{
            name: 'Count',
            data: data,
            tooltip: {},
            turboThreshold: 0
          }],

          chart: {
            renderTo: 'lineGraphContainer'
          }
        };

        new Highcharts.StockChart(dataObject);
      }

      function createTreeChart() {
        $('#createTreeChart').highcharts({
          exporting: {
            enabled: false
          },
          colorAxis: {
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[0],
            stops: [
              [0, '#3060cf'],
              [0.5, Highcharts.getOptions().colors[1]],
              [0.9, Highcharts.getOptions().colors[0]]
            ]
          },
          series: [{
            type: "treemap",
            layoutAlgorithm: 'squarified',
            data: vm.treeData
          }],
          title: {
            text: 'Highcharts Treemap'
          }
        });
      }
    }
  }
})();
