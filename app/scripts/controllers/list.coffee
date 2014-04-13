"use strict"
angular.module("archiveApp").controller "ListController", [
  "$scope"
  "Archive"
  "$stateParams"
  "_"
  "Playlist"
  ($scope, Archive, $stateParams, _, Playlist) ->
    fullSet = undefined

    setCollectionStuff = (data) ->
      fullSet = data.response.docs
      years = _.uniq(_.pluck(fullSet, "year"))
      $scope.shows = fullSet
      $scope.years = years
      $scope.years.push "All"

      #$scope.yearOf = years.slice(0)[0];
      $scope.limit = 20
      $scope.currentlyPlaying = Playlist.playlist()[0].detail

    Archive.getList($stateParams.collection).then (data) ->
      setCollectionStuff(data)


    $scope.loadMore = ->
      $scope.limit += 20
      return

    $scope.setYear = (year) ->
      $scope.limit = 20
      if year is "All"
        $scope.yearOf = `undefined`
      else
        $scope.yearOf = year
      return

    $scope.refresh = ->
      Archive.update($stateParams.collection).then ->
        Archive.getList($stateParams.collection).then (data) ->
          setCollectionStuff(data)
]
