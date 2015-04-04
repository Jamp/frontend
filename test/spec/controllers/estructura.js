'use strict';

describe('Controller: EstructuraCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var EstructuraCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EstructuraCtrl = $controller('EstructuraCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
