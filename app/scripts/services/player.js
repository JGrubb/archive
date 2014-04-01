'use strict';

angular.module('archiveApp')
  .factory('Player', function (audio, $rootScope, localStorageService) {
    var player,
    paused = false,
    ls = localStorageService,
    playlist = ls.get('playlist') || [],
    current;

  player = {
    playlist: playlist,

    current: current,

    playing: false,

    play: function(track) {
      var pl = playlist;
      var cc = current || ls.get('playlist.current');
      if (!pl.length) return;

      if (angular.isDefined(track)) {
        current = track;
        ls.set('playlist.current', track);
      }

      if (!paused) audio.src = 'http://' + pl[cc].server + pl[cc].dir + pl[cc].path;
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
      ls.set('playlist.current', player.current);
    },

    next: function() {
      if (!playlist.length) return;
      paused = false;
      if (playlist.length > (current + 1)) {
        current++;
      } else {
        current = 0;
      }
      console.log('next', current);
      ls.set('playlist.current', current);
      if (player.playing) player.play();
    },

    previous: function() {
      if (!playlist.length) return;
      paused = false;
      if (current > 0) {
        current--;
      } else {
        current = playlist.length - 1;
      }
      console.log('prev', current);
      ls.set('playlist.current', current);
      if (player.playing) player.play();
    }
  };

  playlist.add = function(track) {
    if (playlist.indexOf(track) != -1) return;
    playlist.push(track);
    ls.set('playlist', playlist);
  };

  playlist.remove = function(track) {
    var index = playlist.indexOf(track);
    if (index == current) player.reset();
    playlist.splice(index, 1);
    ls.set('playlist', playlist);
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
