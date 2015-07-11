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
            console.log(result)
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
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
            position: new google.maps.LatLng(r.location.coordinates[1], r.location.coordinates[0]),
            map: map
          });

          google.maps.event.addListener(marker, 'click', markerClick);
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
          return $scope.reports;
        }).then(createMarkersFromReports(map))
        .catch(function (err) {
          toastr.error(err.data.message)
        });
    });


  }]).controller('ReportModalCtrl', ['$scope', '$modalInstance', 'report', 'resources', '$sessionStorage', 'restangularInstance', 'toastr', 'Upload', '$q', '$translate', function ($scope, $modalInstance, report, resources, $sessionStorage, restangularInstance, toastr, Upload, $q, $translate) {

    console.log(report);
    $scope.report = report;
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

    $scope.ok = function () {
      $modalInstance.close($scope.report);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  }]);
