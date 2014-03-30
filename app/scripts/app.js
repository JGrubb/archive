'use strict';

angular.module('archiveApp', [
  'ui.router',
  'LocalStorageModule',
  'chieffancypants.loadingBar',
  'infinite-scroll',
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
  });


var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});
