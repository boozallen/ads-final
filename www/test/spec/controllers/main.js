'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('gapFront'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      IntegrationService: {
        callIntegrationMethod: function(){
          return null;
        }
      }
    });
  }));


  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });


  it('should add to the list of adverse events if a drug searched', function(){
      scope.selectedDrug = 'advil';
      setTimeout(function() {
        expect(scope.searchDrugEvents()).toBeTruthy();
      }, 5000);
  });

  it('should set totalLabels to function param when called', function(){
    expect(scope.totalLabels).toBeUndefined();
    var resp = {
      meta: {
        results: {
          total: 5
        }
      }
    };
    scope.setTotalLabels(resp);
    expect(scope.totalLabels).toBe(5);
  });

  it('should set totalEvents to function param when called', function(){
    expect(scope.totalEvents).toBeUndefined();
    var resp = {
      meta: {
        results: {
          total: 5
        }
      }
    };
    scope.setTotalEvents(resp);
    expect(scope.totalEvents).toBe(5);
  });

  it('should set selected drug when setSelectedDrug is called', function(){
    expect(scope.selectedDrug).toBeUndefined();
    scope.setSelectedDrug('advil');
    expect(scope.selectedDrug).toBeDefined();
  });

  //it('should set text to search correctly when the first or second drug input box is used', function(){
  //  var firstBox = $('#searchTextResultView').val('advil');
  //  console.log(scope.drugs);
  //  scope.searchDrugs();
  //  console.log(scope.drugs);
  //});
});
