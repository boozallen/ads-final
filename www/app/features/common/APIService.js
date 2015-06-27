(function() {
  'use strict';

  angular.module('gapFront')
    .service('APIService', APIService);

  /** @ngInject */
  function APIService(Restangular) {
    var FDAService = Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('https://api.fda.gov');
    });

    var railsService = Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://52.4.69.219:3000//api/v1');
    });

    var pillboxService = Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://pillbox.nlm.nih.gov/PHP/pillboxAPIService.php');
    });

    var drug = FDAService.all('drug');

    return {
      queryDrugLabel: queryDrugLabel,
      queryDrugEvent: queryDrugEvent,
      aggregateDrugLabel: aggregateDrugLabel,
      aggregateDrugEvent: aggregateDrugEvent,
      getDrugsApi: getDrugsApi,
      getLeadersApi: getLeadersApi,
      getEffectsApi: getEffectsApi,
      getDrugDateReportCount: getDrugDateReportCount,
      getVerifiedApi: getVerifiedApi,
      getLeaderBoard: getLeaderBoard
    };

    /**
     * @ngdoc function
     * @name queryDrugLabel
     * @description calls the Food and Drug Administration's api and queries it.
     * @param {string} query - The query to send to open fda api.
     * @param {integer} skip - For dealing with paginated results.
     * @param {integer} limit - The number of results to request.
     */
    function queryDrugLabel(query, skip, limit) {
      var params = {
        search: query,
        skip: skip,
        limit: limit
      };
      return drug.get('label.json', params);
    }

    function queryDrugEvent(query, skip, limit) {
      var params = {};
      if (query) params.search = query;
      if (skip) params.skip = skip;
      if (limit) params.limit = limit;
      return drug.get('event.json', params);
    }

    function aggregateDrugLabel(query, limit, aggregationField) {
      var params = {};
      if (query) params.search = query;
      if (limit) params.limit = limit;
      if (aggregationField) params.count = aggregationField;
      return drug.get('label.json', params);
    }

    function aggregateDrugEvent(query, limit, aggregationField) {
      var params = {};
      if (query) params.search = query;
      if (limit) params.limit = limit;
      if (aggregationField) params.count = aggregationField;
      return drug.get('event.json', params);
    }

    function getDrugsApi() {
      return railsService.all('drugs');
    }

    function getEffectsApi() {
      return railsService.all('effects');
    }

    function getLeadersApi() {
      return railsService.all('leaders')
    }

    function getVerifiedApi(array) {
      return railsService.all('verified');
    }

    function getDrugDateReportCount(query, aggregationField) {
      var params = {};
      params.search = query;
      params.count = aggregationField;
      return drug.get('event.json', params);
    }

    function getLeaderBoard() {
      return railsService.all('leaders');
    }
  }
})();
