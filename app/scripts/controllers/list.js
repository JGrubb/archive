'use strict';

angular.module('archiveApp')
.controller('ListController', ['$scope', 'Archive', '$stateParams', '_', 'Playlist',
  function ($scope, Archive, $stateParams, _, Playlist) {

  var fullSet;

  Archive.getList($stateParams.collection)
  .then(function(data) {
    fullSet = data.response.docs;

    var years = _.uniq(_.pluck(fullSet, 'year'));

    $scope.shows = fullSet;
    $scope.years = years;
    $scope.years.push('All');
    //$scope.yearOf = years.slice(0)[0];
    $scope.limit = 20;
    $scope.currentlyPlaying = Playlist.playlist()[0].detail;
    console.log($scope.currentlyPlaying);
  });

  $scope.loadMore = function() {
    $scope.limit += 20;
  }

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
