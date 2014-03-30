'use strict';

angular.module('archiveApp')
  .controller('MainController', function ($scope, Archive, $timeout) {

    Archive.getIndex().then(function(data) {
      $scope.bands = data;
    });

    $scope.limit = 60;

    $scope.loadMore = function() {
      $scope.limit += 60;
    }

  });
