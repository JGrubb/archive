'use strict';

angular.module('archiveApp')
  .controller('DetailController', function ($scope, Archive, $stateParams, $sce) {
    Archive.getShow($stateParams.id).then(function(data) {
      console.log(data);
      $scope.data = data;
      $scope.metadata = data.metadata;
      $scope.item = data.item;
      $scope.reviews = data.reviews;
      $scope.files = data.files;
      $scope.misc = data.misc;

    });
  });
