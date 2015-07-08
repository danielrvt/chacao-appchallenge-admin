'use strict';

angular.module('dndAdminTemplate')
  .value('apiBaseUrl', '{{API base URL here}}')
  .value('apiKey', '{{API Key here}}')
  .factory('resources', [function () {
    return {
      //TODO Set your resources here.
    }
  }])
  .factory('restangularInstance', ['Restangular', 'apiBaseUrl', function (Restangular, apiBaseUrl) {
    Restangular.setBaseUrl(apiBaseUrl);
    Restangular.setFullResponse(true);
    return Restangular;
  }]);
