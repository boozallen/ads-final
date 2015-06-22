'use strict';

/**
 * @ngdoc function
 * @name gapFront.servece:APIService
 * @description
 * # APIService
 * Angular Service providing access to the FDA Drug APIs
 */
angular.module('gapFront')
  .service('APIService', function (Restangular) {
    Restangular.setBaseUrl('https://api.fda.gov').setEncodeIds(false);
    var drug = Restangular.all('drug');
    //var drugLabel = drug.all('label.json');
    //var drugEvent = drug.all('event.json');


    function queryDrugLabel(query, skip, limit, callback, error){
      var params = {
        search:query,
        skip:skip,
        limit:limit
      };
      return drug.get('label.json', params);
    }

    function queryDrugEvent(query, skip, limit){
      var params = {};
      if(query) params.search = query;
      if(skip) params.skip = skip;
      if(limit) params.limit = limit;
      return drug.get('event.json', params);
    }

    function aggregateDrugLabel(query, aggregationField){
      var params = {};
      if(query) params.search = query;
      if(aggregationField) params.count = aggregationField;
      return drug.get('label.json', params);
    }

    function aggregateDrugEvent(query, aggregationField){
      var params = {};
      if(query) params.search = query;
      if(aggregationField) params.count = aggregationField;
      return drug.get('event.json', params);
    }

    return {
      queryDrugLabel:queryDrugLabel,
      queryDrugEvent:queryDrugEvent,
      aggregateDrugLabel:aggregateDrugLabel,
      aggregateDrugEvent:aggregateDrugEvent
    };
  });
