"use strict"
angular.module("archiveApp").controller "DetailController", [
  "$scope"
  "Archive"
  "$stateParams"
  "Playlist"
  "_"
  "emit"
  "Current"
  ($scope, Archive, $stateParams, Playlist, _, emit, Current) ->
    Archive.getShow($stateParams.id).then (data) ->
      console.log data
      $scope.data = data
      $scope.metadata = data.metadata
      $scope.item = data.item
      $scope.reviews = data.reviews
      $scope.misc = data.misc
      $scope.metakeys = Object.keys($scope.metadata)
      for file of data.files
        _.extend data.files[file],
          path: file
          band: data.metadata.creator[0]
          date: data.metadata.date[0]
          orig: $stateParams.id
          collection: data.metadata.collection[0]
          url: "http://" + data.server + data.dir + file

      notTracks = _.filter(data.files, (item) ->
        not item.hasOwnProperty("length")
      )
      tracks = _.filter(data.files, (item) ->
        item.format is "VBR MP3"
      )

      #console.log(tracks);
      $scope.notTracks = notTracks
      $scope.tracks = tracks
      $scope.id = $stateParams.id
      return

    $scope.current = Current
    $scope.addTrack = (track) ->
      Playlist.addTrack track
      return

    $scope.addShow = (show) ->
      Playlist.addShow show
      return

    $scope.currentlyPlaying = ->
      playlist = Playlist.playlist()
      playlist[0].detail

    $scope.play = (index) ->
      Current.track = index
      emit "playlist:clear"
      playlist = Playlist.addShow($scope.tracks)
      emit "player:play",
        album: 0
        track: index

    $scope.refresh = (id) ->
      console.log(id)
]
