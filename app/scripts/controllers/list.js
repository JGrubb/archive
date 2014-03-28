'use strict';

angular.module('archiveApp')
  .controller('ListController', function ($scope, archive, $stateParams) {

    archive.getList($stateParams.collection)
    .success(function(data) {
      console.log(data);
      $scope.shows = data.response.docs;
    });

    $scope.gridOptions = { data: 'shows' };

  });
