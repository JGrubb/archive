'use strict';

angular.module('archiveApp')
  .factory('messageBus', function messageBus($rootScope) {
    return {

      prepForBroadcast: function() {
        this.message = arguments;
        this.broadcastItem();
      };

      broadcastItem: function() {
        $rootScope.$broadcast('handleBroadcast');
      };

    }
  });
