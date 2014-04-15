'use strict';

angular.module('archiveApp')
  .factory('db', ['pouchdb', function (pouchdb) {

    var cache = pouchdb.create('archive');
    //var favs = pouchdb.create('favorites');
    //console.log(db)
    //db.replicate.to('http://www.archive-ui.org:5984/archive', {continuous: true})
    //db.replicate.from('http://www.archive-ui.org:5984/archive', {continuous: true})

    return {
      cache: cache
      //favs: favs
    };

  }]);
