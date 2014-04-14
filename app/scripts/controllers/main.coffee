"use strict"
angular.module("archiveApp").controller "MainController", [
  "$scope"
  "Archive"
  "Playlist"
  "$rootScope"
  "emit"
  "Current"
  "_"
  ($scope, Archive, Playlist, $rootScope, emit, Current, _) ->
    Archive.getIndex().then (data) ->
      $scope.bands = data
      $scope.AZ = _.map(_.range(65, (65 + 26)), (item) ->
        String.fromCharCode item
      )

    $scope.current = Current

    Current.state = "home"

    $scope.playlist = Playlist.playlist()
    $rootScope.$on "playlist:clear", ->
      $scope.playlist = Playlist.clearPlaylist()

    $scope.limit = 40

    $scope.loadMore = ->
      $scope.limit += 20

    $scope.play = (track, album) ->
      emit "player:play",
        track: track
        album: album

    $scope.randomize = ->
      $scope.bands.sort -> 0.5 - Math.random()
]
