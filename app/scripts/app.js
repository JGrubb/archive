'use strict';

angular.module('archiveApp', [
  'ui.router'
])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'views/main.html'
    })
    .state('list', {
      url: '/:collection',
      templateUrl: 'views/list.html',
      controller: 'ListController'
    })
    .state('detail',  {
      
    });
  });
