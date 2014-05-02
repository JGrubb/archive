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

    $interval ->
      $scope.timeline = {width: "#{(audio.currentTime / audio.duration) * 100}%"}
    , 250

    $scope.setTime = ($event) ->
      #console.log $event
      x = $event.clientX
      width = window.innerWidth
      audio.pause() unless paused
      length = audio.duration
      audio.currentTime = length * (x / width)
      audio.play() unless paused

    $scope.state = $state
    state = $state

    $rootScope.$on "playlist:ready", ->
      playlist = Playlist.getPlaylist()

      $scope.currentAlbum = playlist.detail
      $scope.collection = playlist.collection

    timeFormatter = (seconds) ->
      minutes = Math.floor(seconds / 60)
      seconds = seconds % 60
      minutes = (if (minutes < 10) then "0" + minutes else minutes)
      seconds = (if (seconds < 10) then "0" + seconds else seconds)
      formatted = (if (not minutes) then "00:00" else minutes + ":" + seconds)
      formatted

    $scope.play = (track) ->
      #console.log(track)
      playlist = Playlist.getPlaylist()
      #console.log playlist
      return unless playlist.tracks.length

      #console.log playlist
      current = track if angular.isDefined(track)
      currentTrack = playlist.tracks[current]
      #console.log currentTrack
      unless paused
        audio.src = currentTrack.url
        audio.type = 'audio/mp3'
        audio.preload = 'auto'
      audio.play()
      #console.log angular.element(audio)
      $scope.playing = true
      paused = false
      ls.set "playlist.current", current
      $scope.currentlyPlaying = currentTrack.title or currentTrack.path
      $scope.currentAlbum = playlist.detail
      $scope.collection = playlist.collection

      $scope.current = Current

      #console.dir(audio);
      interval = $interval(->
        if $scope.playing
          currentTime = Math.floor(audio.currentTime)
          duration = Math.floor(audio.duration)
          $scope.currentTime = timeFormatter(currentTime)
          $scope.duration = timeFormatter(duration)
        return
      , 250)

    $scope.pause = ->
      if $scope.playing
        $interval.cancel interval
        audio.pause()
        $scope.playing = false
        paused = true

    $scope.prev = ->
      playlist = Playlist.getPlaylist()
      return  unless playlist.tracks.length
      paused = false
      ls.set "currentTime", 0
      if audio.currentTime > 3
        audio.currentTime = 0
      else
        if current > 0
          current--
        else
          current = playlist.tracks.length - 1
      $scope.play(current)  if $scope.playing

    $scope.next = ->
      playlist = Playlist.getPlaylist()
      return  unless playlist.tracks.length
      paused = false
      if playlist.tracks.length > (current + 1)
        current++
      else
        current = 0
      $scope.play(current)  if $scope.playing

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

    $rootScope.$on "player:play", (event, track) ->
      ls.set "currentTime", 0
      $scope.play track


    audio.addEventListener "ended", (->
      $rootScope.$apply $scope.next
    ), false
]
