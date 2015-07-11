'use strict';

angular.module('dndAdminTemplate')
  .controller('ReportsCtrl', ['$scope', '$modal', 'resources', '$sessionStorage', 'restangularInstance', 'toastr', 'Upload', '$q', '$translate', function ($scope, $modal, resources, $sessionStorage, restangularInstance, toastr, Upload, $q, $translate) {

    $scope.resPerPage = 50;
    $scope.reportsMeta = {};
    $scope.reports = [];
    $scope.markers = [];

    var markerClick = function () {
      restangularInstance.one(resources.report, this.id).get()
        .then(function (resp) {
          var report = resp.data.plain();
          console.log(report);
          if (!report.description && !report.photo_url) return;

          var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'reportModalTmpl.html',
            controller: 'ReportModalCtrl',
            //size: '',
            resolve: {
              report: function () {
                return report;
              }
            }
          });

          modalInstance.result.then(function (result) {
            console.log(result);
            if (result.status == 'RESOLVED' || result.status == 'INVALIDATED') {

            }
          }, function () {
          });

        })
        .catch(function (err) {
          err.data.message
        });
    };

    var createMarkersFromReports = function (map) {
      return function (reports) {
        $scope.markers = _.map(reports, function (r) {
          var marker = new google.maps.Marker({
            id: r.id,
            position: new google.maps.LatLng(r.location.coordinates[0], r.location.coordinates[1]),
            map: map
          });
          google.maps.event.addListener(marker, 'click', markerClick);
          console.log(r.location.coordinates, r.status);
        });
      };
    };

    $scope.$on('mapInitialized', function (event, map) {
      $scope.map = map;

      restangularInstance.all(resources.reports).get("", {page: 1, resPerPage: $scope.resPerPage})
        .then(function (resp) {
          $scope.reportsMeta = resp.data.plain();
          return $scope.reportsMeta
        })
        .then(function (reportsMeta) {
          var promises = [];
          for (var i = 1; i <= reportsMeta.totalPages; i++) {
            $scope.page = i;
            promises.push(restangularInstance.all(resources.reports).get("", {
              page: i,
              resPerPage: $scope.resPerPage
            }));
          }

          return $q.all(promises);
        }).then(function (results) {
          $scope.reports = [];
          _.each(results, function (result) {
            $scope.reports = $scope.reports.concat(result.data.plain().results);
          });
          $scope.reports = _.filter($scope.reports, function (r) {
            return r.status != 'RESOLVED' || r.status != 'INVALIDATED';
          });
          return $scope.reports;
        }).then(createMarkersFromReports(map))
        .catch(function (err) {
          toastr.error(err.data.message)
        });
    });


  }]).controller('ReportModalCtrl', ['$scope', '$modalInstance', 'report', 'resources', '$sessionStorage', 'restangularInstance', 'toastr', 'Upload', '$q', '$translate', function ($scope, $modalInstance, report, resources, $sessionStorage, restangularInstance, toastr, Upload, $q, $translate) {

    $scope.report = report;
    $scope.comments = '';

    $scope.translateType = function (type) {
      var dictionary = {
        'CRIME': 'Delito',
        'MEDICAL_ASSIST': 'Asistencia Médica',
        'WATER_LEAK': 'Bote de Agua',
        'TRAFFIC_ACCIDENT': 'Accidente de Tránsito',
        'BROKEN_LIGHT': 'Alumbrado Dañado',
        'TRAFFIC_LIGHTS': 'Semáforo Dañado',
        'TRASH': 'Basura',
        'BROKEN_STREET': 'Hueco en la Vía',
        'OTHER': 'Otro'
      };
      return dictionary[type];
    };

    $scope.translateStatus = function (status) {

      var dictionary = {
        'RECEIVED': 'Recibido',
        'VALIDATED': 'Validado',
        'INVALIDATED': 'Rechazado',
        'RESOLVED': 'Resuelto'
      };
      return dictionary[status];
    };

    $scope.nextPosibleStatus = function (currentStatus) {
      if (currentStatus == 'RECEIVED') return ['VALIDATED', 'INVALIDATED', 'RESOLVED'];
      if (currentStatus == 'VALIDATED') return ['INVALIDATED', 'RESOLVED'];
      return [];
    };

    $scope.changeStatus = function (report, newStatus, comments) {
      console.log(newStatus, comments);
      restangularInstance.one('/admin' + resources.report, report.id).customPUT({
        status: newStatus,
        comments: comments
      })
        .then(function (response) {
          $scope.report = response.data.plain();
        });
    };

    $scope.ok = function () {
      $modalInstance.close($scope.report);
    };

    $scope.cancel = function () {
      $modalInstance.close($scope.report);
    };

  }]);
