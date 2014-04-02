'use strict';

angular.module('archiveApp')
  .directive('auiPlayer', function () {
    return {
      templateUrl: 'views/player.html',
      restrict: 'EA',
      scope: true,
      controller: ['Playlist', '$scope', 'audio',
        function(Playlist, $scope, audio) {

          var playlist = Playlist.playlist;
          var paused = false;
          console.log(Playlist);

          $scope.playing = false;
          $scope.path = '';


          $scope.play = function(track) {
            console.log('play');
            if (!playlist.length) return;
            if (!paused) {
              var track = Playlist.getNext();
              audio.src = 'http://' + track.server + track.dir + track.path;
            }
            $scope.playing = true;
            audio.play();
          };

          $scope.pause = function() {
            console.log('pause');
            audio.pause();
            $scope.playing = false;
            paused = true;
          };

          $scope.prev = function() {
            console.log('previous');
          };

          $scope.next = function() {
            console.log('next');
          };
        }
      ],
      replace: false,
      link: function postLink(scope, element, attrs) {
      }
    };
  }).factory('audio', function($document) {
    var audio = $document[0].createElement('audio');
    return audio;
  });
