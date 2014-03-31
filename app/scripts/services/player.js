'use strict';

angular.module('archiveApp')
  .factory('Player', function (audio, $rootScope) {
    var player,
    playlist = [],
    paused = false,
    current = 0;

  player = {
    playlist: playlist,

    current: current,

    playing: false,

    play: function(track) {
      if (!playlist.length) return;

      if (angular.isDefined(track)) player.current = track;
      console.log('helo');

      if (!paused) audio.src = 'http://' + playlist[player.current].server + playlist[player.current].dir + playlist[player.current].path;
      audio.play();
      player.playing = true;
      paused = false;
    },

    pause: function() {
      if (player.playing) {
        audio.pause();
        player.playing = false;
        paused = true;
      }
    },

    reset: function() {
      player.pause();
      current = 0;
    },

    next: function() {
      if (!playlist.length) return;
      paused = false;
      if (playlist[current].length > (current + 1)) {
        current++;
      } else {
        current = 0;
      }
      if (player.playing) player.play();
    },

    previous: function() {
      if (!playlist.length) return;
      paused = false;
      if (current > 0) {
        current--;
      } else {
        current.track = playlist.length - 1;
      }
      if (player.playing) player.play();
    }
  };

  playlist.add = function(track) {
    if (playlist.indexOf(track) != -1) return;
    playlist.push(track);
  };

  playlist.remove = function(track) {
    var index = playlist.indexOf(track);
    if (index == current) player.reset();
    playlist.splice(index, 1);
  };

  audio.addEventListener('ended', function() {
    $rootScope.$apply(player.next);
  }, false);

  return player;
  });


angular.module('archiveApp')
  .factory('audio', function($document) {
    var audio = $document[0].createElement('audio');
    return audio;
  });
