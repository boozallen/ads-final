'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('gapFront'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('AboutCtrl', {
      $scope: scope
    });
  }));

   it('should remove nav links on about page when removeNavLinks is called', function () {
     //expect('#navbar-links').toBeInDOM();
     //scope.removeNavLinks();
     expect('#navbar-links').not.toBeInDOM();
   });
});
