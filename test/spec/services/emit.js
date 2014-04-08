'use strict';

describe('Service: emit', function () {

  // load the service's module
  beforeEach(module('archiveApp'));

  // instantiate service
  var emit;
  beforeEach(inject(function (_emit_) {
    emit = _emit_;
  }));

  it('should do something', function () {
    expect(!!emit).toBe(true);
  });

});
