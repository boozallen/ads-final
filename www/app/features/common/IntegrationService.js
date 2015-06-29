(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name gapFront.servece:IntegrationService
   * @description
   * # IntegrationService
   * Angular Service providing access to the FDA Drug APIs
   */
  angular.module('gapFront')
    .service('IntegrationService', IntegrationService);

  function IntegrationService() {
    var integrationMethods = {};

    return {
      registerIntegrationMethod: registerIntegrationMethod,
      callIntegrationMethod: callIntegrationMethod
    };

    function registerIntegrationMethod(name, func) {
      integrationMethods[name] = func;
    }

    function callIntegrationMethod(name, params) {
      integrationMethods[name](params);
    }
  }
})();
