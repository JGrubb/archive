'use strict';

angular.module('archiveApp')
  .factory('Archive', function ($http, $q, localStorageService) {
    var ls = localStorageService;
    var archiveSearchUrl = 'https://archive.org/advancedsearch.php';
    var archiveShowUrl = 'https://archive.org/details/';
    var requestList = function(collection) {
      var d = $q.defer();
      if (ls.get(collection)) {
        d.resolve(ls.get(collection));
        console.log(ls.get(collection));
      } else {
        console.log('not stored');
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
            'title' ],
            'sort[]': [ 'date desc', '', '' ],
            rows: '1500',
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
      getList: function(collection) {
        return requestList(collection);
      },
      getShow: function(id) {
        return requestShow(id);
      }
    };
  });
