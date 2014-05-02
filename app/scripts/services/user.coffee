'use strict'

angular.module('archiveApp')
  .factory 'user', (localStorageService) ->

    ls = localStorageService

    get = ->
      ls.get('user') or false

    set = (user) ->
      console.log(user)
      ls.set('user', user)

    {
      get: ->
        get()

      set: (user) ->
        set(user)
    }
