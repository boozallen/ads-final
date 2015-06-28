(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name gapFront
   * @description
   * # gapFront
   *
   * Main module of the application.
   */
  angular.module('gapFront', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'restangular',
    'ui.checkbox',
    'mgcrea.ngStrap',
    'ui-rangeSlider'
  ]).config(routing)
    .config(modals);

  function routing($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.state('main', {
      url: '/',
      templateUrl: 'features/main/main.html',
      controller: 'MainCtrl as vm'
    }).state('charts', {
      url: '/charts',
      templateUrl: 'features/chart/chart.html',
      controller: 'ChartCtrl'
    }).state('label-effects', {
      url: '/label-effects',
      templateUrl: 'features/labelEffects/labelEffects.html',
      controller: 'LabelEffectsCtrl'
    }).state('drug-info', {
      url: '/drug-info',
      templateUrl: 'features/drugInfo/drug-info.html',
      controller: 'DrugInfoController as vm'
    }).state('leaderboard', {
      url: '/leader',
      templateUrl: 'features/leaderBoard/leaderBoard.html',
      controller: 'DrugInfoController as vm'
    }).state('about', {
      url: '/about',
      templateUrl: 'features/about/about.html'
    });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  }

  function modals($modalProvider) {
    angular.extend($modalProvider.defaults, {html: true});
  }
})();
