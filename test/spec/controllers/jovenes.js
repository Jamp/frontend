'use strict';

describe('Controller: JovenesCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var JovenesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JovenesCtrl = $controller('JovenesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
