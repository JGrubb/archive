'use strict';

angular.module('archiveApp')
.controller('MainController', [ '$scope', 'Archive', 'Playlist', '$rootScope', 'emit', 'Current',
    function ($scope, Archive, Playlist, $rootScope, emit, Current) {
      Archive.getIndex().then(function(data) {
        $scope.bands = data;
        $scope.bands.sort( function() { return 0.5 - Math.random() } );
      });

      var current = Current;

      $scope.current = current;
      $scope.playlist = Playlist.playlist();

      $rootScope.$on('playlist:clear', function() {
        console.log('testing');
        $scope.playlist = Playlist.clearPlaylist();
      });

      $scope.limit = 40;

      $scope.clearCache = function() {
        ls.clearAll();
      };

      $scope.loadMore = function() {
        $scope.limit += 20;
      };

      $scope.play = function(track, album) {
        emit('player:play', {track: track, album: album});
      };

    } ]);
