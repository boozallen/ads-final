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

  it('should initialize variables when calling initializeVariables', function () {
    expect(scope.filterType).toBeUndefined();
    expect(scope.seriousness).toBeUndefined();
    expect(scope.outcome).toBeUndefined();
    expect(scope.age).toBeUndefined();
    expect(scope.totalReportedCount).toBeUndefined();
    expect(scope.percentSerious).toBeUndefined();
    expect(scope.percentNonSerious).toBeUndefined();
    expect(scope.startDate).toBeUndefined();
    expect(scope.endDate).toBeUndefined();
    expect(scope.dateChartData).toBeUndefined();
    expect(scope.toggleCharts).toBeUndefined();

    scope.initializeVariables();

    expect(scope.filterType).toEqual('hospitalizations');
    expect(scope.seriousness).toEqual('all');
    expect(scope.outcome).toEqual('all');
    expect(scope.age).toEqual('all');
    expect(scope.totalReportedCount).toEqual(0);
    expect(scope.percentSerious).toEqual(50);
    expect(scope.percentNonSerious).toEqual(50);
    expect(scope.startDate).toEqual(19000101);
    expect(scope.endDate).toEqual(20500101);
    expect(scope.dateChartData).toEqual([]);
    expect(scope.toggleCharts).toEqual(true);
  });
});
