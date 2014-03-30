angular.module('archiveApp')
  .factory('Archive', function ($http, $q, localStorageService) {
    var ls = localStorageService;
    var archiveSearchUrl = 'https://archive.org/advancedsearch.php';
    var archiveShowUrl = 'https://archive.org/details/';

    var requestIndex = function() {
      var d = $q.defer();
      if (ls.get('idx')) {
        d.resolve(ls.get('idx'))
      } else {
        $http.get('index.json').success(function(data) {
          d.resolve(data);
          ls.set('idx', data);
        });
      }
      return d.promise;
    }

    var requestList = function(collection) {
      var d = $q.defer();
      if (ls.get(collection)) {
        d.resolve(ls.get(collection));
      } else {
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
          ls.set(collection, data);
        }).error(function(message) {
          d.reject(message);
        });
      };
      return d.promise;
    }

    var requestShow = function(id) {
      var d = $q.defer();
      if (ls.get(id)) {
        d.resolve(ls.get(id)); 
      } else {
        $http({
          method: 'JSONP',
          url: archiveShowUrl + id,
          params: {
            output: 'json',
            callback: 'JSON_CALLBACK'
          }
        }).success(function(data) {
          d.resolve(data);
          ls.set(id, data)
        });
      };
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
