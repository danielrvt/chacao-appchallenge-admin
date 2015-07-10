'use strict';

angular.module('dndAdminTemplate')
  .controller('ReportsCtrl', ['$scope', 'resources', '$sessionStorage', 'restangularInstance', 'toastr', 'Upload', '$q', '$translate', function ($scope, resources, $sessionStorage, restangularInstance, toastr, Upload, $q, $translate) {

    //Configuración del mapa
    $scope.wms = {
      source: {
        type: 'ImageWMS',
        url: 'http://200.74.193.82/ArcGIS/rest/services/RETOCHACAO/infomapa1/MapServer',
        params: {LAYERS: 'base'}
      }
    };
    
    $scope.ven = {
      lat: 10.497958,
      lon: -66.856484,
      zoom: 14
    };

    $scope.page = 1;
    $scope.resPerPage = 50;
    $scope.reportsMeta = {};
    $scope.reports = [];
    $scope.markers = [
      {lat: 10.497558, lon: -66.846484},
      {lat: 10.498958, lon: -66.866484},
      {lat: 10.507958, lon: -66.859484},
      {lat: 10.487958, lon: -66.849484},
    ];


    //Eventos del mapa
    $scope.$on('openlayers.layers.geojson.click', function(event, feature) {
      $scope.$apply(function(scope) {
        if(feature) {
          $scope.mouseClickCountry = feature?$scope.countries[feature.getId()].name:'';
        }
      });
    });

    restangularInstance.all(resources.reports).get("", {page: $scope.page, resPerPage: $scope.resPerPage})
      .then(function (resp) {
        $scope.reportsMeta = resp.data.plain();
        return $scope.reportsMeta
      })
      .then(function (reportsMeta) {
        var promises = [];
        for (var i = 1; i < reportsMeta.totalPages; i++) {
          $scope.page = i;
          promises.push(restangularInstance.all(resources.reports).get("", {
            page: $scope.page,
            resPerPage: $scope.resPerPage
          }));
          return $q.all(promises);
        }
      }).then(function (results) {
        $scope.reports = [];
        _.each(results, function (result) {
          $scope.reports.concat(result.data.plain());
        });
        return $scope.reports;
      });
  }]);
