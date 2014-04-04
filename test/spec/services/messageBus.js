'use strict';

describe('Service: Messagebus', function () {

  // load the service's module
  beforeEach(module('ArchiveApp'));

  // instantiate service
  var Messagebus;
  beforeEach(inject(function (_Messagebus_) {
    Messagebus = _Messagebus_;
  }));

  it('should do something', function () {
    expect(!!Messagebus).toBe(true);
  });

});
