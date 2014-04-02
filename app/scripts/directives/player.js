'use strict';

angular.module('archiveApp')
  .directive('auiPlayer', function () {
    return {
      templateUrl: 'views/player.html',
      restrict: 'EA',
      scope: true,
      controller: 'PlayerController',
      replace: false,
      link: function postLink(scope, element, attrs) {
      }
    };
  }).factory('audio', function($document) {
    var audio = $document[0].createElement('audio');
    return audio;
  });
