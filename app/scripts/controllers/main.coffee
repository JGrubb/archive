"use strict"
angular.module("archiveApp").controller "MainController", [
  "$scope"
  "Archive"
  "Playlist"
  "$rootScope"
  "emit"
  "Current"
  "_"
  "$window"
  ($scope, Archive, Playlist, $rootScope, emit, Current, _, $window) ->

    favorites = []

    $rootScope.$on '$stateChangeStart', (event, toState, toParams, fromState, fromParams) ->
      #console.log(toParams)
      $window.ga('send', 'pageview', JSON.stringify(toParams) )

    Archive.getIndex().then (data) ->
      $scope.bands = data
      $scope.AZ = _.map(_.range(65, (65 + 26)), (item) ->
        String.fromCharCode item
      )

    $scope.current = Current

    Current.state = "home"

    $rootScope.$on "playlist:ready", ->
      #console.log('hewllo')
      playlist = Playlist.getPlaylist()
      #console.log(playlist)
      playlist.tracks = angular.fromJson playlist.tracks
      $scope.playlist = playlist

    $scope.limit = 40

    $scope.loadMore = ->
      $scope.limit += 20

    $scope.play = (track) ->
      emit "player:play", track

    $scope.randomize = ->
      $scope.bands.sort -> 0.5 - Math.random()
]
