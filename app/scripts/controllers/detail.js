'use strict';

angular.module('archiveApp')
  .controller('DetailController', function ($scope, Archive, $stateParams) {
    console.log('food');
    Archive.getShow($stateParams.id).then(function(data) {
      console.log(data)
    });
  });
