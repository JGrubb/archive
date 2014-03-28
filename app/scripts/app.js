'use strict';

angular.module('archiveApp', [
  'ui.router',
  'ngGrid',
  'LocalStorageModule'
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
      url: '/detail/:id',
      templateUrl: 'views/detail.html',
      controller: 'DetailController'
    });
  });
