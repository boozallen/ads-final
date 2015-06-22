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
      drug.get('label.json', params).then(callback, error);
    }

    function queryDrugEvent(query, skip, limit, callback, error){
      var params = {};
      if(query) params.search = query;
      if(skip) params.skip = skip;
      if(limit) params.limit = limit;
      drug.get('event.json', params).then(callback, error);
    }

    function aggregateDrugLabel(query, aggregationField, callback, error){
      var params = {};
      if(query) params.search = query;
      if(aggregationField) params.count = aggregationField;
      drug.get('label.json', params).then(callback, error);
    }

    function aggregateDrugEvent(query, aggregationField, callback, error){
      var params = {};
      if(query) params.search = query;
      if(aggregationField) params.count = aggregationField;
      drug.get('event.json', params).then(callback, error);
    }

    return {
      queryDrugLabel:queryDrugLabel,
      queryDrugEvent:queryDrugEvent,
      aggregateDrugLabel:aggregateDrugLabel,
      aggregateDrugEvent:aggregateDrugEvent
    };
  });
