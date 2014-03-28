'use strict';

angular.module('archiveApp')
  .controller('ListController', function ($scope, Archive, $stateParams) {

    Archive.getList($stateParams.collection)
    .then(function(data) {
      console.log(data);
      $scope.shows = data.response.docs;
    });

    $scope.gridOptions = { data: 'shows' };

  });
