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

      $scope.clearPlaylist = function() {
        Playlist.clearPlaylist();
        $scope.playlist = Playlist.playlist;
      };

      $scope.limit = 40;

      $scope.clearCache = function() {
        ls.clearAll();
      };

      $scope.loadMore = function() {
        $scope.limit += 20;
      };

      $scope.emit = function emit() {
        var args = Array.prototype.slice.call(arguments);
        messageBus.broadcastItem(args[0], args.slice(1));
      };

      $scope.removeTrack = function(track, album) {
        Playlist.removeTrack(track, album);
        $scope.playlist = Playlist.playlist;
      }

      $scope.removeAlbum = function(album) {
        Playlist.removeAlbum(album);
        $scope.playlist = Playlist.playlist;
      }

    } ]);
