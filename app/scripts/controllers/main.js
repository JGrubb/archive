'use strict';

angular.module('archiveApp')
  .controller('MainController', function ($scope, Archive, Playlist) {

    Archive.getIndex().then(function(data) {
      $scope.bands = data;
    });

    $scope.playlist = Playlist.playlist;
    console.log(Playlist.playlist);
    $scope.clearPlaylist = Playlist.clearPlaylist;

    $scope.limit = 60;

    $scope.loadMore = function() {
      $scope.limit += 60;
    }

  });
