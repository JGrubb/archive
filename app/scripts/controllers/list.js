'use strict';

angular.module('archiveApp')
.controller('ListController', ['$scope', 'Archive', '$stateParams', '_', 
  function ($scope, Archive, $stateParams, _) {

  var fullSet;

  Archive.getList($stateParams.collection)
  .then(function(data) {
    fullSet = data.response.docs;

    var years = _.uniq(_.pluck(fullSet, 'year'));

    $scope.shows = fullSet;
    console.log(fullSet);
    $scope.years = years;
    $scope.years.push('All');
    //$scope.yearOf = years.slice(0)[0];
    $scope.limit = 20;

  });

  $scope.loadMore = function() {
    $scope.limit += 20;
  }
  console.log($stateParams);

  $scope.yearOf = $stateParams.year;

  $scope.setYear = function(year) {
    $scope.limit = 20;
    if (year === 'All') {
      $scope.yearOf = undefined;
    } else {
      $scope.yearOf = year;
    }
  }
} ]);
