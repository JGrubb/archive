'use strict';

angular.module('archiveApp')
  .factory('Playlist', ['localStorageService', 'audio', '$rootScope', 'db',
    function (localStorageService, audio, $rootScope, db) {

    var ls = localStorageService;
    var playlist = ls.get('playlist') || [],

        removeTrack,
        addTrack,
        addShow;

    var clearPlaylist = function() {
      playlist = [];
      ls.set('playlist', playlist);
      ls.set('playlist.current', {album: 0, track: 0});
      return playlist;
    };

    var addTrack = function(track) {
      if (playlist.length && playlist.slice(-1)[0].album === track.album) {
        // the last album in the queue and the incoming track are the same
        playlist.slice(-1)[0].tracks.push(track);
      } else {
        // the queue is empty or this is from a different show
        playlist.push({
          album: track.album,
          detail: track.orig,
          tracks: [track],
          collection: track.collection,
          date: track.date
        });
      }
      ls.set('playlist', playlist);
    };

    var addShow = function(tracks) {
      console.log(tracks)
      if (playlist.length && playlist.slice(-1)[0].album === tracks[0].album) {
        // just replace the whole show with the ordered copy, because NG don't like
        // copies of things in it's ng-repeats
        playlist.slice(-1)[0].tracks = tracks.slice(0);
      } else {
        playlist.push({
          album: tracks[0].album,
          detail: tracks[0].orig,
          // copy of tracks array
          tracks: tracks.slice(0),
          collection: tracks[0].collection,
          date: tracks[0].date
        });
      }
      ls.set('playlist', playlist);
      return playlist;
    }

    var removeTrack = function(track, album) {
      var current = ls.get('playlist.current');
      if (current.album === album) {
        if (current.track === track) {
          audio.pause();
          current.track = 0;
        }
        if (current.track >= track) {
          current.track--;
        }
        ls.set('playlist.current', current);
      }
      playlist[album].tracks.splice(track, 1);
      ls.set('playlist', playlist);
      return playlist;
    }

    var removeAlbum = function(album) {
      playlist.splice(album, 1);
      ls.set('playlist', playlist);
      return playlist;
    }

    // Public API here
    return {
      removeTrack: function(track, album) { return removeTrack(track, album); },
      removeAlbum: function(album) { return removeAlbum(album); },
      addTrack: function(track) { return addTrack(track); },
      addShow: function(show) { return addShow(show); },
      clearPlaylist: function() { return clearPlaylist()},
      playlist: function() { return playlist; }
    };
  }]);
