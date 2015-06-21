'use strict';

/**
 * @ngdoc overview
 * @name gapFront
 * @description
 * # gapFront
 *
 * Main module of the application.
 */
angular
  .module('gapFront', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
    'mgcrea.ngStrap'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'features/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'features/about/about.html',
        controller: 'AboutCtrl'
      })
      .when('/chart', {
        templateUrl: 'features/chart/chart.html',
        controller: 'ChartCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider
  .html5Mode(true);
  });

  // .run(function(Restangular) {
  //   RestangularProvider.setBaseUrl('http://www.google.com');
  //   RestangularProvider.setRequestSuffix('.json');
  // })
