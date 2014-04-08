'use strict';

angular.module('archiveApp')
  .factory('emit', [ '$rootScope',
    function ($rootScope) {
      return function() { $rootScope.$emit.apply($rootScope, arguments); };
    }]);
