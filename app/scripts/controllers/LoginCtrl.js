'use strict';

angular.module('dndAdminTemplate')
  .controller('LoginCtrl', ['$rootScope', '$scope', 'resources', 'restangularInstance', '$state', 'toastr', 'apiKey', '$sessionStorage', '$q', function ($rootScope, $scope, resources, restangularInstance, $state, toastr, apiKey, $sessionStorage, $q) {

    delete $sessionStorage.session;

    $scope.username;
    $scope.password;

    $scope.login = function (username, password) {
      if (!username || !password) return toastr.error('login-missing-username-or-password');

      restangularInstance.all(resources.session).post({user: $scope.username, password: $scope.password})
        .then(function (session) {
          $sessionStorage.session = session.data.plain();
          $state.go('dashboard.reports');
        })
        .catch(function (err) {
          toastr.error(err);
        });
    };

  }]);
