'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('gapFront'));

  var MainCtrl,
    scope;
  var wait = true;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
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
    }
  )
});
