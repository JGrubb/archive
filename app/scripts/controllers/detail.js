'use strict';

angular.module('archiveApp')
  .controller('DetailController', function ($scope, archive, $stateParams) {
    console.log('food');
    archive.getShow($stateParams.id).success(function(data) {
      console.log(data);
    });
  });
