'use strict';

angular.module('archiveApp')
  .controller('DetailController', ['$scope', 'Archive', '$stateParams', 'Playlist', '_',
    function ($scope, Archive, $stateParams, Playlist, _) {
      Archive.getShow($stateParams.id).then(function(data) {
        //console.log(data);
        $scope.data = data;
        $scope.metadata = data.metadata;
        $scope.item = data.item;
        $scope.reviews = data.reviews;
        $scope.misc = data.misc;

        $scope.metakeys = Object.keys($scope.metadata);

        for (var file in data.files) {
          data.files[file].path = file;
          data.files[file].server = data.server;
          data.files[file].dir = data.dir;
          data.files[file].band = data.metadata.creator[0];
          data.files[file].date = data.metadata.date[0];
          data.files[file].orig = $stateParams.id;
          data.files[file].collection = data.metadata.collection[0];
          data.files[file].url = 'http://' + data.server + data.dir + file;
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
  } ]);
