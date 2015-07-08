'use strict';

angular.module('dndAdminTemplate')
  .controller('LoginCtrl', ['$rootScope', '$scope', 'resources', 'restangularInstance', '$state', 'toastr', 'apiKey', '$sessionStorage', '$q', function ($rootScope, $scope, resources, restangularInstance, $state, toastr, apiKey, $sessionStorage, $q) {

    delete $sessionStorage.session;

    $scope.username;
    $scope.password;

    $scope.login = function (username, password) {
      if (!username || !password) return toastr.error('login-missing-username-or-password');

      $state.go('dashboard.sample');
    };

  }]);
