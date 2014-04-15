'use strict';

angular.module('archiveApp', [
  'ui.router',
  'LocalStorageModule',
  'chieffancypants.loadingBar',
  'infinite-scroll',
  'pouchdb',
  //'dropstore-ng',
  'underscore'
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
    $urlRouterProvider.when('', '/');
    //loggerProvider.setDEVMODE(false);
  });


var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});
