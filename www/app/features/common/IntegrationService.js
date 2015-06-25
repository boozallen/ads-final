'use strict';

/**
 * @ngdoc function
 * @name gapFront.servece:APIService
 * @description
 * # APIService
 * Angular Service providing access to the FDA Drug APIs
 */
angular.module('gapFront')
  .service('IntegrationService', function () {
    var integrationMethods = {};

    function registerIntegrationMethod(name, func){
      integrationMethods[name] = func;
    }

    function callIntegrationMethod(name,params){
      var func = integrationMethods[name];
      func(params);
    }

    return {
      registerIntegrationMethod:registerIntegrationMethod,
      callIntegrationMethod:callIntegrationMethod
    };

  });
