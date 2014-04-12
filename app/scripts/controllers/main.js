'use strict';

angular.module('archiveApp')
.controller('MainController', [ '$scope', 'Archive', 'Playlist', '$rootScope', 'emit', 'Current', '_',
    function ($scope, Archive, Playlist, $rootScope, emit, Current, _) {
      Archive.getIndex().then(function(data) {
        $scope.bands = data;
        $scope.AZ = _.map(_.range(65, (65 + 26)), function(item) { return String.fromCharCode(item)});

        //$scope.bands.sort( function() { return 0.5 - Math.random() } );
      });

      var current = Current;

      $scope.current = current;
      $scope.playlist = Playlist.playlist();

      $rootScope.$on('playlist:clear', function() {
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
