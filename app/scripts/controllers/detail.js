'use strict';

angular.module('archiveApp')
  .controller('DetailController', ['$scope', 'Archive', '$stateParams', 'Playlist', '_', 'emit',
    function ($scope, Archive, $stateParams, Playlist, _, emit) {
      Archive.getShow($stateParams.id).then(function(data) {
        //console.log(data);
        $scope.data = data;
        $scope.metadata = data.metadata;
        $scope.item = data.item;
        $scope.reviews = data.reviews;
        $scope.misc = data.misc;

        $scope.metakeys = Object.keys($scope.metadata);

        for (var file in data.files) {
          _.extend(data.files[file], {
            path: file,
            band: data.metadata.creator[0],
            date: data.metadata.date[0],
            orig: $stateParams.id,
            collection: data.metadata.collection[0],
            url: 'http://' + data.server + data.dir + file
          });
        }

        var notTracks = _.filter(data.files, function(item) {
          return !item.hasOwnProperty('length');
        });

        var tracks = _.filter(data.files, function(item) {
          return item.format === 'VBR MP3';
        });
        //console.log(tracks);

        $scope.notTracks = notTracks;
        $scope.tracks = tracks;
      });

      $scope.addTrack = function(track) {
        Playlist.addTrack(track);
      }

      $scope.addShow = function(show) {
        Playlist.addShow(show);
      }

      $scope.play = function (index) {
        emit('playlist:clear');
        var playlist = Playlist.addShow($scope.tracks);
        emit('player:play', {album: 0, track: index});
      }
  } ]);
