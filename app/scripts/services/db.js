'use strict';

angular.module('archiveApp')
  .factory('db', ['pouchdb', function (pouchdb) {

    var cache = pouchdb.create('archive');
    var favs = pouchdb.create('favorites');
    var playlist = pouchdb.create('playlist');
    //console.log(db)
    //db.replicate.to('http://www.archive-ui.org:5984/favs', {continuous: true})
    //db.replicate.from('http://www.archive-ui.org:5984/favs', {continuous: true})
    //db.replicate.to('http://www.archive-ui.org:5984/playlist', {continuous: true})
    //db.replicate.from('http://www.archive-ui.org:5984/playlist', {continuous: true})

    return {
      cache: cache,
      favs: favs,
      playlist: playlist
    };

  }]);
