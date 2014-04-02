'use strict';

angular.module('archiveApp')
  .factory('Playlist', ['localStorageService',
    function (localStorageService) {
    
    var ls = localStorageService;
    var playlist = ls.get('playlist') || [],
    current = { album: 0, track: 0 };

    var getPrev,
        getNext,
        removeTrack,
        addTrack,
        addShow;

    var clearPlaylist = function() {
      playlist = [];
      ls.set('playlist', playlist);
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
      if (playlist.length && playlist.slice(-1)[0].album === tracks[0].album) {
        playlist.slice(-1)[0].tracks = tracks;
      } else {
        playlist.push({
          album: tracks[0].album,
          detail: tracks[0].orig,
          tracks: tracks,
          collection: tracks[0].collection,
          date: tracks[0].date
        });
      }
      ls.set('playlist', playlist);
    }

    var next = function() {
      var track = playlist[current.album].track;
      current.album.track++;
      console.log(track);
      return track;
    }

    // Public API here
    return {
      getPrev: function() { return prev(); },
      getNext: function() { return next(); },
      removeTrack: function(track) { return removeTrack(track); },
      addTrack: function(track) { return addTrack(track); },
      addShow: function(show) { return addShow(show); },
      clearPlaylist: function() { return clearPlaylist()},
      playlist: playlist
    };
  }]);
