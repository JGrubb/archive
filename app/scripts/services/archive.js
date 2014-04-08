angular.module('archiveApp')
  .factory('Archive', function ($http, $q, db) {
    var archiveSearchUrl = 'https://archive.org/advancedsearch.php';
    var archiveShowUrl = 'https://archive.org/details/';

    var requestIndex = function() {
      var d = $q.defer();

      db.get('idx').then(function(doc) {
        d.resolve(doc.data);
      }, function() {
        $http.get('index.json').success(function(data) {
          d.resolve(data);
          db.put({ _id: 'idx', data: data });
        });
      });

      return d.promise;
    }

    var requestList = function(collection) {
      var d = $q.defer();

      db.get(collection).then(function(doc) {
        d.resolve(doc.data);
      }, function() {
        $http({
          method: 'JSONP',
          url: archiveSearchUrl,
          params: {
            q: 'collection:"' + collection +'"',
            'fl[]':
              [ 'avg_rating',
            'date',
            'downloads',
            'description',
            'identifier',
            'year',
            'title' ],
            'sort[]': [ 'date desc', '', '' ],
            rows: '10000',
            page: '1',
            indent: 'yes',
            output: 'json',
            callback: 'JSON_CALLBACK',
            save: 'yes'
          }
        }).success(function(data) {
          d.resolve(data);
          db.put({ _id: collection, data: data });
        }).error(function(message) {
          d.reject(message);
        });
      });

      return d.promise;
    }

    var requestShow = function(id) {
      var d = $q.defer();

      db.get(id).then(function(doc) {
        //console.log(doc);
        d.resolve(doc.data);
      }, function() {
        $http({
          method: 'JSONP',
          url: archiveShowUrl + id,
          params: {
            output: 'json',
            callback: 'JSON_CALLBACK'
          }
        }).success(function(data) {
          d.resolve(data);
          db.put({ _id: id, data: data });
        });
      });

      return d.promise;
    }

    return {
      getIndex: function() {
        return requestIndex();
      },
      getList: function(collection) {
        return requestList(collection);
      },
      getShow: function(id) {
        return requestShow(id);
      }
    };
  });
