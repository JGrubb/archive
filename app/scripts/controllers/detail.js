'use strict';

angular.module('archiveApp')
  .controller('DetailController', ['$scope', 'Archive', '$stateParams', 'Player',
    function ($scope, Archive, $stateParams, Player) {
      Archive.getShow($stateParams.id).then(function(data) {
        console.log(data);
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
        }

        var notTracks = _.filter(data.files, function(item) {
          return !item.hasOwnProperty('length');
        });
        
        //console.log(notTracks);

        var tracks = _.filter(data.files, function(item) {
          return item.format === 'VBR MP3';
        });

        //tracks = _.groupBy(tracks, function(item) {
        //  return item.track;
        //});

        //console.log(tracks);
        $scope.notTracks = notTracks;
        $scope.tracks = tracks;
      });

      $scope.addShow = function(tracks) {
        for( var i = 0, len = tracks.length; i < len; i++ ) {
          Player.playlist.add(tracks[i]);
        }
      }

  } ]);
