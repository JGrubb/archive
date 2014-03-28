'use strict';

angular.module('archiveApp')
  .factory('archive', function ($http) {
    var archiveSearchUrl = 'https://archive.org/advancedsearch.php';
    var archiveShowUrl = 'https://archive.org/details/';
    var requestList = function(collection) {
      return $http({
        method: 'JSONP',
        url: archiveSearchUrl,
        params: {
          q: 'collection:"' + collection +'"',
          'fl[]':
            [ 'avg_rating',
          'date',
          'downloads',
          'format',
          'description',
          'identifier',
          'title' ],
          'sort[]': [ 'date desc', '', '' ],
          rows: '200',
          page: '1',
          indent: 'yes',
          output: 'json',
          callback: 'JSON_CALLBACK',
          save: 'yes'
        }
      });
    };

    var requestShow = function(id) {
      return $http({
        method: 'JSONP',
        url: archiveShowUrl + id,
        params: {
          callback: 'JSON_CALLBACK'
        }
      });
    };

    return {
      getList: function(collection) {
        return requestList(collection);
      },
      getShow: function(id) {
        return requestShow(id);
      }
    };
  });
