'use strict';

angular.module('archiveApp')
  .factory('db', ['pouchdb', 'emit', 'user', function (pouchdb, emit, user) {

    var callIt = function() {
      console.log('true');
      emit('playlist:ready')
    }

    var cache = pouchdb.create('archive');
    var favs = pouchdb.create('favorites');
    var playlist = pouchdb.create('playlist');
    //console.log(db)
    //db.replicate.to('http://www.archive-ui.org:5984/favs', {continuous: true})
    //db.replicate.from('http://www.archive-ui.org:5984/favs', {continuous: true})
    if (user.get()) {
      playlist.replicate.to('http://www.archive-ui.org:5984/playlist', {
        live: true,
        complete: console.log('test')
      })
      playlist.replicate.from('http://www.archive-ui.org:5984/playlist', {
        live: true,
        complete: console.log('test')
      })
    }

    return {
      cache: cache,
      favs: favs,
      playlist: playlist
    };

  }]);
