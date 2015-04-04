'use strict';

describe('Controller: SalirCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var SalirCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SalirCtrl = $controller('SalirCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
