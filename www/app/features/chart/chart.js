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
      if($scope.plot2b) {
        $scope.plot2b.destroy();
      }
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
        createChart();

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
      $scope.setChartData();
    };

    $scope.setChartData = function(data){
      $scope.crowdVerified = data;
      $scope.chart = data;

      $scope.effects = [];
      $scope.treeData = [];
      $scope.crowdVerified = [];
      $scope.barLabels = {};
      $scope.chartSymptoms = [];
      $scope.chartSymbols = [];
      var numbers = [];
      $scope.counts = [{name: "Reported Adverse Effects", data: numbers}];
      for (var i in $scope.chart) {
        $scope.chartSymptoms.push([$scope.chart[i].count, $scope.chart[i].term.toLowerCase()]);
        // $scope.crowdVerified.push($scope.chart[i].term.toLowerCase());
        $scope.effects.push($scope.chart[i].term.toLowerCase());
        $scope.counts[0].data.push($scope.chart[i].count);

        if($scope.drugEffects){
          //console.log($scope.chart[i].term.toLowerCase());
          //console.log($scope.drugEffects.yes_answers);
          if($scope.chart[i].term.toLowerCase() in $scope.drugEffects.yes_answers) { //is in yes
            if ($scope.chart[i].term.toLowerCase() in $scope.drugEffects.no_answers) { // also in no
              if($scope.drugEffects.yes_answers[$scope.chart[i].term.toLowerCase()] > $scope.drugEffects.no_answers[$scope.chart[i].term.toLowerCase()]){ // more in yes
                $scope.treeData.push({name: $scope.chart[i].term.toLowerCase(), value: $scope.chart[i].count, colorValue: 2});
                $scope.barLabels[$scope.chart[i].term.toLowerCase()] = " <span class='glyphicon glyphicon-ok-sign' style='color:#5bc0de; font-size: 17px;'></span>";
                $scope.chartSymbols.push("<span class='glyphicon glyphicon-ok-sign' style='color:#5bc0de; font-size: 17px;'></span>");
              } else if($scope.drugEffects.yes_answers[$scope.chart[i].term.toLowerCase()] == $scope.drugEffects.no_answers[$scope.chart[i].term.toLowerCase()]){ // equal yes and no votes
                $scope.treeData.push({name: $scope.chart[i].term.toLowerCase(), value: $scope.chart[i].count, colorValue: 0});
                $scope.barLabels[$scope.chart[i].term.toLowerCase()] = " <span class='glyphicon glyphicon-exclamation-sign'  style='color:#f8ac59; font-size: 17px;'></span>";
                $scope.chartSymbols.push("<span class='glyphicon glyphicon-exclamation-sign'  style='color:#f8ac59; font-size: 17px;'></span>");
              } else {
                $scope.treeData.push({name: $scope.chart[i].term.toLowerCase(), value: $scope.chart[i].count, colorValue: 1}); // more in no
                $scope.barLabels[$scope.chart[i].term.toLowerCase()] = " <span class='glyphicon glyphicon-ok-circle' style='color:#ed5565; font-size: 17px;'></span>";
                $scope.chartSymbols.push("<span class='glyphicon glyphicon-ok-circle' style='color:#ed5565; font-size: 17px;'></span>");
              }
            } else { // not in no
              $scope.barLabels[$scope.chart[i].term.toLowerCase()] = " <span class='glyphicon glyphicon-ok-sign' style='color:#5bc0de; font-size: 17px;'></span>";
              $scope.treeData.push({name: $scope.chart[i].term.toLowerCase(), value: $scope.chart[i].count, colorValue: 2});
              $scope.chartSymbols.push("<span class='glyphicon glyphicon-ok-sign' style='color:#5bc0de; font-size: 17px;'></span>");
            }
          } else if ($scope.chart[i].term.toLowerCase() in $scope.drugEffects.no_answers) { // in no but not yes
            $scope.barLabels[$scope.chart[i].term.toLowerCase()] = " <span class='glyphicon glyphicon-ok-circle' style='color:#ed5565; font-size: 17px;'></span>";
            $scope.treeData.push({name: $scope.chart[i].term.toLowerCase(), value: $scope.chart[i].count, colorValue: 1}); // more in no
            $scope.chartSymbols.push("<span class='glyphicon glyphicon-ok-circle' style='color:#ed5565; font-size: 17px;'></span>");
          } else { // in neither
            $scope.barLabels[$scope.chart[i].term.toLowerCase()] = " <span class='glyphicon glyphicon-question-sign' style='color:#d3d3d3; font-size: 17px;'></span>";
            $scope.treeData.push({name: $scope.chart[i].term.toLowerCase(), value: $scope.chart[i].count, colorValue: 3});
            $scope.chartSymbols.push("<span class='glyphicon glyphicon-question-sign' style='color:#d3d3d3; font-size: 17px;'></span>");
          }
        }
      }
      console.log($scope.chartSymptoms);
      console.log($scope.chartSymbols);

      createChart();
      createTreeChart();
      $scope.terms= $scope.chart;


      //$scope.data = data;
      //
      //$scope.chartData = [];
      //$scope.chartData.push({key: "Top 15 Adverse Effects", color: "#d62728",
      //  values: []});
      //
      //console.log($scope.chartData);
      //$scope.chartSymptoms = [];
      //
      //for (var i in $scope.data) {
      //  $scope.chartData[0].values.push({"label": data[i].term.toLowerCase(), "value": data[i].count} )
      //  $scope.chartSymptoms.push([data[i].count,data[i].term.toLowerCase()]);
      //}
      //console.log($scope.chartData[0]);
      //
      //console.log($scope.chartSymptoms);
    };


    function createChart() {
      console.log('in createChart');
      var tickFormatter = function (format, val) {
        if (val >= 1000000) {
          val = val / 1000000;
          return val.toFixed(1) + "M";
        }
        if (val >= 1000) {
          val = val / 1000;
          if (val < 10) {
            return val.toFixed(1) + "K";
          }
          return val.toFixed(0) + "K";
        }
        return val;
      };
      var line1Labels = $scope.chartSymbols;
      $scope.plot2b = $.jqplot('chart2b', [$scope.chartSymptoms], {
        seriesDefaults: {
          renderer:$.jqplot.BarRenderer,
          pointLabels: {
            show: true,
            location: 'w',
            escapeHTML: false,
            edgeTolerance: -15,
            labels: line1Labels
          },
          shadowAngle: 135,
          rendererOptions: {
            barDirection: 'horizontal'
          }
        },
        grid: {
          gridLineColor: '#ffffff',   // CSS color spec of the grid lines.
          background: '#ffffff',      // CSS color spec for background color of grid.
          borderColor: '#ffffff',     // CSS color spec for border around grid.
          borderWidth: 2.0,           // pixel width of border around grid.
          shadow: false,               // draw a shadow for grid.
          shadowAngle: 45,            // angle of the shadow.  Clockwise from x axis.
          shadowOffset: 1.5,          // offset from the line of the shadow.
          shadowWidth: 3,             // width of the stroke for the shadow.
          shadowDepth: 3
        },
        axes: {
          yaxis: {
            renderer: $.jqplot.CategoryAxisRenderer,
            excapeHTML: false,
            tickOptions:{
              labelPosition: 'left',
              mark: 'inside'
            }
          },
          xaxis: {
            tickOptions: {
              formatter: tickFormatter
            }
          }
        }
      });

      $('#chart2b').bind('jqplotDataHighlight',
        function (ev, seriesIndex, pointIndex, data) {
          $('#info2b').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data+ ', pageX: '+ev.pageX+', pageY: '+ev.pageY);
        }
      );
      $('#chart2b').bind('jqplotDataClick',
        function (ev, seriesIndex, pointIndex, data) {
          $('#info2c').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data+ ', pageX: '+ev.pageX+', pageY: '+ev.pageY);
        }
      );

      $('#chart2b').bind('jqplotDataUnhighlight',
        function (ev) {
          $('#info2b').html('Nothing');
        }
      );
    }

    function createPieChart() {
    }

    function createLineChart() {
    }

    function createTreeChart(){
    }
  });
