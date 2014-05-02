'use strict';

angular.module('archiveApp')
  .factory('Playlist', ['localStorageService', 'audio', '$rootScope', 'user', 'db', 'emit',
    function (localStorageService, audio, $rootScope, user, db, emit) {

    var ls = localStorageService;
    var playlist,
        user = user.get(),
        removeTrack,
        addTrack,
        addShow;

    var addShow = function(tracks) {
      //console.log(db)
      db.playlist.get(user).then(function(doc) {
        db.playlist.put({
          _rev: doc._rev,
          album: tracks[0].album,
          detail: tracks[0].orig,
          tracks: angular.toJson(tracks),
          collection: tracks[0].collection,
          date: tracks[0].date
        }, user).then(function(response) {
          db.playlist.get(user).then(function(doc) {
            playlist = doc;
            emit('playlist:ready');
          })
        });
      }).catch(function() {
        db.playlist.put({
          album: tracks[0].album,
          detail: tracks[0].orig,
          tracks: angular.toJson(tracks),
          collection: tracks[0].collection,
          date: tracks[0].date
        }, user).then(function(response) {
          db.playlist.get(user).then(function(doc) {
            playlist = doc;
            emit('playlist:ready');
          })
        });
      });
    }

    db.playlist.get(user).then(function(doc) {
      playlist = doc
      emit('playlist:ready')
    })


    // Public API here
    return {
      addShow: function(show) { return addShow(show); },
      getPlaylist: function() { return playlist; }
    };
  }]);
