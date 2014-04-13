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
      $scope.bands.sort ->
        0.5 - Math.random()

      return

    current = Current
    $scope.current = current
    $scope.playlist = Playlist.playlist()
    $rootScope.$on "playlist:clear", ->
      $scope.playlist = Playlist.clearPlaylist()
      return

    $scope.limit = 40
    $scope.clearCache = ->
      ls.clearAll()
      return

    $scope.loadMore = ->
      $scope.limit += 20
      return

    $scope.play = (track, album) ->
      emit "player:play",
        track: track
        album: album
]
