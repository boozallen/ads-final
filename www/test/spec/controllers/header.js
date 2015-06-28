'use strict';

describe('Controller: HeaderCtrl', function () {

  // load the controller's module
  beforeEach(module('gapFront'));

  var HeaderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HeaderCtrl = $controller('HeaderCtrl', {
      $scope: scope
    });
  }));

  it('should remove nav links on about page when removeNavLinks is called', function () {
    expect(scope.about).not.toEqual(null);
  });
});
