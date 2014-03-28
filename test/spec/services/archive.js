'use strict';

describe('Service: archive', function () {

  // load the service's module
  beforeEach(module('archiveApp'));

  // instantiate service
  var archive;
  beforeEach(inject(function (_archive_) {
    archive = _archive_;
  }));

  it('should do something', function () {
    expect(!!archive).toBe(true);
  });

});
