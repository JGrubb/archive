'use strict';

angular.module('archiveApp')
  .controller('PlayerController', ['Playlist', '$scope', 'audio', 'localStorageService', '$rootScope', '$interval',
        function(Playlist, $scope, audio, localStorageService, $rootScope, $interval) {

          var playlist = Playlist.playlist;
          var ls = localStorageService;
          var paused = false;
          var current = $scope.$parent.current;
          var currentTime = parseInt(ls.get('currentTime'), 10);

          $scope.playing = false;
          $scope.path = '';
          var interval;

          $scope.currentTime = "00:00";

          var timeFormatter = function(seconds) {
            var minutes = Math.floor(seconds / 60);
            var seconds = seconds % 60;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            return (minutes === NaN) ? "00:00" : minutes + ":" + seconds;
          }


          $scope.play = function(track, album) {
            //console.log(paused);
            if (!playlist.length) return;
            //console.log(currentTime);
            if (angular.isDefined(track)) current.track = track;
            if (angular.isDefined(album)) current.album = album;

            if (!paused) audio.src = playlist[current.album].tracks[current.track].url;
            audio.play();
            $scope.playing = true;
            paused = false;
            ls.set('playlist.current', current);
            $scope.currentlyPlaying = playlist[current.album].tracks[current.track].title;
            console.dir(audio);
            interval = $interval(function() {
              if ($scope.playing) {
                var currentTime = Math.ceil(audio.currentTime);
                var duration = Math.floor(audio.duration);
                $scope.currentTime = timeFormatter(currentTime);
                $scope.duration = timeFormatter(duration);
                ls.set('currentTime', currentTime);
              }
            }, 1000);
          };


          $scope.pause = function() {
            if ($scope.playing) {
              $interval.cancel(interval);
              audio.pause();
              $scope.playing = false;
              paused = true;
            }
          };

          $scope.prev = function() {
            if (!playlist.length) return;
            paused = false;
            ls.set('currentTime', 0);
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
            ls.set('currentTime', 0);
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
