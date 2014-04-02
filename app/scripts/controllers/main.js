'use strict';

angular.module('archiveApp')
.controller('MainController', [ '$scope', 'Archive', 'Playlist', 'localStorageService', 
    function ($scope, Archive, Playlist, localStorageService) {
      var ls = localStorageService;
      Archive.getIndex().then(function(data) {
        $scope.bands = data;
        $scope.bands.sort( function() { return 0.5 - Math.random() } );
      });

      $scope.playlist = Playlist.playlist;
      console.log(Playlist.playlist);
      $scope.clearPlaylist = Playlist.clearPlaylist;

      $scope.limit = 5;

      $scope.clearCache = function() {
        ls.clearAll();
      };

      $scope.loadMore = function() {
        $scope.limit += 10;
      }
      console.log($scope);

    } ]);
