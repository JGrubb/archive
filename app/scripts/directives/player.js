'use strict';

angular.module('archiveApp')
  .directive('player', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        element.text('this is the player directive');
      }
    };
  });
