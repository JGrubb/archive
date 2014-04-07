'use strict';

angular.module('archiveApp')
  .factory('db', ['pouchdb', function (pouchdb) {

    var db = pouchdb.create('archive');

    return db;

  }]);
