'use strict';

angular.module('archiveApp')
  .controller('MainController', function ($scope, Archive, Player) {

    Archive.getIndex().then(function(data) {
      $scope.bands = data;
    });

    $scope.player = Player;

    $scope.limit = 60;

    $scope.loadMore = function() {
      $scope.limit += 60;
    }

  });
