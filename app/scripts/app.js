'use strict';

angular.module('archiveApp', [
  'ui.router'
])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('list', {
      url: '/',
      templateUrl: 'views/main.html'
    }) 
  });
