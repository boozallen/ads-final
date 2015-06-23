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
    var FDAService = Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('https://api.fda.gov');
    });

    var railsService = Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://52.4.69.219:3000/api/v1');
    });

    var pillboxService = Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://pillbox.nlm.nih.gov/PHP/pillboxAPIService.php');
    });


    var drug = FDAService.all('drug');
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

    function aggregateDrugLabel(query, limit, aggregationField){
      var params = {};
      if(query) params.search = query;
      if(limit) params.limit = limit;
      if(aggregationField) params.count = aggregationField;
      return drug.get('label.json', params);
    }

    function aggregateDrugEvent(query, limit, aggregationField){
      var params = {};
      if(query) params.search = query;
      if(limit) params.limit = limit;
      if(aggregationField) params.count = aggregationField;
      return drug.get('event.json', params);
    }

    function getDrugEffectApi(){
      return railsService.all('drugs');
    }




    return {
      queryDrugLabel:queryDrugLabel,
      queryDrugEvent:queryDrugEvent,
      aggregateDrugLabel:aggregateDrugLabel,
      aggregateDrugEvent:aggregateDrugEvent,
      getDrugEffectApi:getDrugEffectApi
    };
  });
