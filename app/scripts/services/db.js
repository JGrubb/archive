'use strict';

angular.module('archiveApp')
  .factory('db', ['pouchdb', function (pouchdb) {

    var db = pouchdb.create('archive');
    //console.log(db)
    //db.replicate.to('http://www.archive-ui.org:5984/archive', {continuous: true})
    //db.replicate.from('http://www.archive-ui.org:5984/archive', {continuous: true})

    return db;

  }]);
