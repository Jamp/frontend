'use strict';

describe('Service: apiFactory', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var apiFactory;
  beforeEach(inject(function (_apiFactory_) {
    apiFactory = _apiFactory_;
  }));

  it('should do something', function () {
    expect(!!apiFactory).toBe(true);
  });

});
