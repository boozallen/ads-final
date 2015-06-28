'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:AboutCtrl
 * @description A simple controller to do nothing but remove navigation links from the navbar view when on the about controller
 * # AboutCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('AboutCtrl', function ($scope) {

    removeNavLinks();

    function removeNavLinks() {
      /** remove navbar links in header on about page since they're for the single page app page
      allows us to reuse. */
      $("#navbar-links").remove();
    }
  });
