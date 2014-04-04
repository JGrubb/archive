'use strict';

angular.module('archiveApp')
.controller('MainController', [ '$scope', 'Archive', 'Playlist', 'localStorageService', 'messageBus',
    function ($scope, Archive, Playlist, localStorageService, messageBus) {
      var ls = localStorageService;
      Archive.getIndex().then(function(data) {
        $scope.bands = data;
        $scope.bands.sort( function() { return 0.5 - Math.random() } );
      });

      $scope.playlist = Playlist.playlist;

      $scope.clearPlaylist = Playlist.clearPlaylist;

      $scope.limit = 40;

      $scope.clearCache = function() {
        ls.clearAll();
      };

      $scope.loadMore = function() {
        $scope.limit += 20;
      };

      $scope.emit = function emit() {
        var args = Array.prototype.slice.call(arguments);
        messageBus.prepForBroadcast(args);
      };

    } ]);
