'use strict';

angular.module('archiveApp')
  .controller('MainController', function ($scope, Archive, $timeout) {

    Archive.getIndex().then(function(data) {
      $scope.bands = data;
    });

  });
