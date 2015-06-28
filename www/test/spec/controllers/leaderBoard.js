'use strict';

describe('Controller: LeaderBoardCtrl', function () {

  // load the controller's module
  beforeEach(module('gapFront'));

  var LeaderBoardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LeaderBoardCtrl = $controller('LeaderBoardCtrl', {
      $scope: scope

    });
  }));

  it('should add Leader', function () {
    expect(scope.newLeader).toBeUndefined();
    scope.addLeader('me');
    expect(scope.newLeader).toBe('me');
  });
});
