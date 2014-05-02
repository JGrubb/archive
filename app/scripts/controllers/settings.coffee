'use strict'

angular.module('archiveApp')
  .controller 'SettingsController', ($scope, user) ->

    console.log user

    $scope.userName = user.get()

    $scope.setUser = (userName) ->
      user.set(userName)
