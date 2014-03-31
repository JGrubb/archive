'use strict';

angular.module('archiveApp')
  .controller('DetailController', ['$scope', 'Archive', '$stateParams',
    function ($scope, Archive, $stateParams) {
      Archive.getShow($stateParams.id).then(function(data) {
        console.log(data);
        $scope.data = data;
        $scope.metadata = data.metadata;
        $scope.item = data.item;
        $scope.reviews = data.reviews;
        $scope.misc = data.misc;
        $scope.filePath = 'http://archive.org/download/' + data.metadata.identifier[0] + '/' + data.metadata.identifier[0] + '_vbr_mp3.zip';

        $scope.hasMp3 = data.metadata.mas_mp3 === '1';

      for (var file in data.files) {
        data.files[file].path = file;
        data.files[file].server = data.server;
        data.files[file].dir = data.dir;
      }

      var notTracks = _.filter(data.files, function(item) {
        return typeof item.track === 'undefined';
      });
      
      console.log(notTracks);

      var tracks = _.filter(data.files, function(item) {
        return item.format === 'VBR MP3' || item.format === 'Ogg Vorbis';
      });

      tracks = _.groupBy(tracks, function(item) {
        return item.track;
      });
      //console.log(tracks);
      $scope.notTracks = notTracks;
      $scope.tracks = tracks;
    });
} ]);
