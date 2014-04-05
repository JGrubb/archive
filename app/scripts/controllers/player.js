'use strict';

angular.module('archiveApp')
  .controller('PlayerController', ['Playlist', '$scope', 'audio', 'localStorageService', '$rootScope', 'messageBus',
        function(Playlist, $scope, audio, localStorageService, $rootScope, messageBus) {

          var playlist = Playlist.playlist;
          var ls = localStorageService;
          var paused = false;
          console.log(Playlist);
          var current = ls.get('playlist.current') || {
            album: 0,
            track: 0
          };

          $scope.playing = false;
          $scope.path = '';


          $scope.play = function(track, album) {
            //console.log(paused);
            if (!playlist.length) return;

            if (angular.isDefined(track)) current.track = track;
            if (angular.isDefined(album)) current.album = album;

            if (!paused) audio.src = playlist[current.album].tracks[current.track].url;
            audio.play();
            $scope.playing = true;
            paused = false;
            ls.set('playlist.current', current);
            $scope.currentlyPlaying = playlist[current.album].tracks[current.track].title;
          };

          $scope.pause = function() {
            if ($scope.playing) {
              audio.pause();
              $scope.playing = false;
              paused = true;
            }
          };

          $scope.prev = function() {
            if (!playlist.length) return;
            paused = false;
            if (current.track > 0) {
              current.track--;
            } else {
              current.album = (current.album - 1 + playlist.length) % playlist.length;
              current.track = playlist[current.album].tracks.length - 1;
            }
            if ($scope.playing) $scope.play();
          };

          $scope.next = function() {
            if (!playlist.length) return;
            paused = false;
            if (playlist[current.album].tracks.length > (current.track + 1)) {
              current.track++;
            } else {
              current.track = 0;
              current.album = (current.album + 1) % playlist.length;
            }
            if ($scope.playing) $scope.play();
          };
          $scope.$parent.current = current;

          $scope.$on('toPlayer', function() {
            var args = arguments[1];
            $scope[args[0]](args[1], args[2]);
          }); 

          audio.addEventListener('ended', function() {
            $rootScope.$apply($scope.next);
          }, false);
        }
      ]);
