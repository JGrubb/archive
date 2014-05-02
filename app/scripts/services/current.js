'use strict';

angular.module('archiveApp')
  .factory('Current', function (localStorageService) {
    var ls = localStorageService;
    var current = 0

    return current;
  });
