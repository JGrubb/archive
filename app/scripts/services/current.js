'use strict';

angular.module('archiveApp')
  .factory('Current', function (localStorageService) {
    var ls = localStorageService;
    var current = {
      album: 0,
      track: 0
    }

    return current;
  });
