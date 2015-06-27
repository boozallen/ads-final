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
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
    'ui.checkbox',
    'mgcrea.ngStrap',
    'ui-rangeSlider'
  ]).config(routing)
    .config(modals);

  function routing($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: 'features/main/main.html',
      controller: 'MainCtrl'
    }).when('/chart', {
      templateUrl: 'features/chart/chart.html',
      controller: 'ChartCtrl'
    }).when('/labelEffects', {
      templateUrl: 'features/labelEffects/labelEffects.html',
      controller: 'LabelEffectsCtrl'
    }).when('/about', {
      templateUrl: 'features/about/about.html'
    }).otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  }

  function modals($modalProvider) {
    angular.extend($modalProvider.defaults, {html: true});
  }
})();
