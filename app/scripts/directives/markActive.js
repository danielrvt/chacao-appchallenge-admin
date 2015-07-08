'use-strict';

/**
 *
 */
angular.module('dndAdminTemplate')
  .directive('markActive', ["$rootScope", "$location", function ($rootScope, $location) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        var path = function () {
          return $location.path();
        };

        return scope.$watch(path, function (newVal, oldVal) {
          _.each(element[0].children[0].children, function (e, i) {
            var liHref = $(e).find('a').attr("href");
            $(e).removeClass('active');
            if (liHref === '#' + path()) $(e).addClass('active');
          });
        });
      }
    };
  }]);
