'use strict';

angular.module('dndAdminTemplate')
  .controller('ReportsCtrl', ['$scope', 'resources', '$sessionStorage', 'restangularInstance', 'toastr', 'Upload', '$q', '$translate', function ($scope, resources, $sessionStorage, restangularInstance, toastr, Upload, $q, $translate) {

    $scope.page = 1;
    $scope.resPerPage = 50;

    console.log(restangularInstance.all(resources.reports).getRestangularUrl())
    restangularInstance.all(resources.reports).get("", {page: $scope.page, resPerPage: $scope.resPerPage})
      .then(function (resp) {
        console.log(resp.data.plain());
      });


  }]);
