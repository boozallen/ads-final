'use strict';

describe('Controller: ChartCtrl', function () {

  // load the controller's module
  beforeEach(module('gapFront'));

  var ChartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartCtrl = $controller('ChartCtrl', {
      $scope: scope
    });
  }));

  it('should attach seriousness to the scope set to app', function () {
    $scope.seriousness = "all";
    $scope.outcome = "all";
    $scope.age = "all";
    expect(scope.seriousness).to.equal('app');
  });
});
