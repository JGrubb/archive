'use strict'

describe 'Service: Favorites', ->

  # load the service's module
  beforeEach module 'archiveApp'

  # instantiate service
  Favorites = {}
  beforeEach inject (_Favorites_) ->
    Favorites = _Favorites_

  it 'should do something', ->
    expect(!!Favorites).toBe true
