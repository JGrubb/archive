'use strict';

angular.module('archiveApp')
  .controller('ListController', function ($scope, Archive, $stateParams, _) {

    var fullSet;

    Archive.getList($stateParams.collection)
    .then(function(data) {
      fullSet = data.response.docs;

      var years = _.uniq(_.map(_.pluck(fullSet, 'date'), function(item) {
        return parseInt(item.slice(0, 4), 10);
      }), true);

      $scope.shows = fullSet;
      console.log(fullSet[0]);
      $scope.years = years;
      //$scope.yearOf = years.slice(0)[0];
      $scope.limit = 20;
    });

    $scope.loadMore = function() {
      $scope.limit += 20;
    }

    $scope.setYear = function(year) {
      $scope.yearOf = year;
    }
  });
