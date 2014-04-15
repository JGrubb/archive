"use strict"
angular.module("archiveApp").controller "PlayerController", [
  "Playlist"
  "$scope"
  "audio"
  "localStorageService"
  "$rootScope"
  "$interval"
  "Current"
  "$state"
  (Playlist, $scope, audio, localStorageService, $rootScope, $interval, Current, $state) ->
    ls = localStorageService
    paused = false
    current = Current
    currentTime = parseInt(ls.get("currentTime"), 10)
    $scope.playing = false
    $scope.path = ""
    interval = undefined
    $scope.currentTime = "00:00"

    $scope.state = $state
    state = $state

    playlist = Playlist.playlist()

    $scope.currentAlbum = playlist[0].detail
    $scope.collection = playlist[0].collection

    timeFormatter = (seconds) ->
      minutes = Math.floor(seconds / 60)
      seconds = seconds % 60
      minutes = (if (minutes < 10) then "0" + minutes else minutes)
      seconds = (if (seconds < 10) then "0" + seconds else seconds)
      formatted = (if (not minutes) then "00:00" else minutes + ":" + seconds)
      formatted

    $scope.play = (track, album) ->
      playlist = Playlist.playlist()
      return  unless playlist.length

      #console.log playlist
      current.track = track  if angular.isDefined(track)
      current.album = album  if angular.isDefined(album)
      currentTrack = playlist[current.album].tracks[current.track]
      unless paused
        audio.src = currentTrack.url
        audio.type = 'audio/mp3'
        audio.preload = 'auto'
        audio.addEventListener "canplay", ->
          audio.currentTime = ls.get("currentTime") or 0
          return

      audio.play()
      console.log angular.element(audio)
      $scope.playing = true
      paused = false
      ls.set "playlist.current", current
      $scope.currentlyPlaying = currentTrack.title or currentTrack.path
      $scope.currentAlbum = playlist[0].detail
      $scope.collection = playlist[0].collection

      $scope.current = Current

      #console.dir(audio);
      interval = $interval(->
        if $scope.playing
          currentTime = Math.floor(audio.currentTime)
          duration = Math.floor(audio.duration)
          $scope.currentTime = timeFormatter(currentTime)
          $scope.duration = timeFormatter(duration)
          ls.set "currentTime", currentTime
        return
      , 1000)
      return

    $scope.pause = ->
      if $scope.playing
        $interval.cancel interval
        audio.pause()
        $scope.playing = false
        paused = true
      return

    $scope.prev = ->
      playlist = Playlist.playlist()
      return  unless playlist.length
      paused = false
      ls.set "currentTime", 0
      if audio.currentTime > 3
        audio.currentTime = 0
      else
        if current.track > 0
          current.track--
        else
          current.album = (current.album - 1 + playlist.length) % playlist.length
          current.track = playlist[current.album].tracks.length - 1
      $scope.play()  if $scope.playing
      return

    $scope.next = ->
      playlist = Playlist.playlist()
      return  unless playlist.length
      paused = false
      ls.set "currentTime", 0
      if playlist[current.album].tracks.length > (current.track + 1)
        current.track++
      else
        current.track = 0
        current.album = (current.album + 1) % playlist.length
      $scope.play()  if $scope.playing
      return

    $scope.back = ->
      if $state.current.name is "detail"
        $state.go('list', {collection: playlist[0].collection })
      if $state.current.name is "list"
        $state.go('home')

    $scope.forward = ->
      if $state.current.name is "home"
        $state.go('list', { collection: playlist[0].collection })
      if $state.current.name is "list"
        $state.go('detail', { id: playlist[0].detail })

    $rootScope.$on "player:play", (event, args) ->
      ls.set "currentTime", 0
      $scope.play args.track, args.album
      return

    audio.addEventListener "ended", (->
      $rootScope.$apply $scope.next
      return
    ), false
]
