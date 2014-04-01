'use strict';

angular.module('archiveApp')
  .directive('auiPlayer', function () {
    return {
      templateUrl: 'views/player.html',
      restrict: 'EA',
      scope: true,
      controller: ['Playlist', '$scope', function(Playlist, $scope) {
        $scope.test = function() {
          console.log('testing');
        }
      }],
      replace: false,
      link: function postLink(scope, element, attrs) {
      }
    };
  });
