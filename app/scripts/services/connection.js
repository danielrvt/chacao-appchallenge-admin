'use strict';

angular.module('dndAdminTemplate')
  .value('apiBaseUrl', 'http://ec2-52-10-59-85.us-west-2.compute.amazonaws.com:5000')
  .value('apiKey', 'dt5nF0xBPNQ61dqQEofuFO5t4x9iu8l6')
  .factory('resources', [function () {
    return {
      session: '/session',
      reports: '/reports',
      report: '/report'
    }
  }])
  .factory('restangularInstance', ['Restangular', 'apiBaseUrl', function (Restangular, apiBaseUrl) {
    Restangular.setBaseUrl(apiBaseUrl);
    Restangular.setFullResponse(true);
    return Restangular;
  }]);
