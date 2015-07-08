'use-strict';

/**
 *
 */
angular.module('dndAdminTemplate')
  .directive('hideInLocation', ["$rootScope", "$location", function ($rootScope, $location) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        var path = function () {
          return $location.path();
        };

        return scope.$watch(path, function (newVal, oldVal) {

          if (path() == attrs['hideInLocation']) {
            console.log(path(), attrs['hideInLocation']);
            element.hide();
          } else {
            element.show();
          }
        });
      }
    };
  }]);
