'use strict';

angular.module('archiveApp')
  .factory('messageBus', function messageBus($rootScope) {
    return {

      broadcastItem: function(name, args) {
        $rootScope.$broadcast(name, args);
      }

    }
  });
