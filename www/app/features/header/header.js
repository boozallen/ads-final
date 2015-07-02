'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('HeaderCtrl', function ($scope, $location) {

    $scope.about = $location.path();
    //console.log($location.path());

    $scope.scrollToEventReports = function scrollToEventReports(){
      console.log('scrolling');
      $('html, body').animate({
        scrollTop: $("#events-reports").offset().top-70
      }, 500);
    };

    $scope.scrollToLabelAccuracy = function scrollToLabelAccuracy(){
      console.log('scrolling');
      $('html, body').animate({
        scrollTop: $("#label-accuracy").offset().top-70
      }, 500);
    }

    $scope.scrollToSearch = function scrollToSearch(){
      console.log('scrolling');
      $('html, body').animate({
        scrollTop: $("#searchSplashScreen").offset().top-70
      }, 500);
    }
  });
