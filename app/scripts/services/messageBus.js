'use strict';

angular.module('archiveApp')
  .factory('messageBus', function messageBus($rootScope) {
    return {

      prepForBroadcast: function(args) {
        this.broadcastItem(args[0], args.slice(1));
      },

      broadcastItem: function(name, message) {
        $rootScope.$broadcast(name, message);
      }

    }
  });
