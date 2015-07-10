'use strict';

/**
 * @ngdoc overview
 * @name dndAdminTemplate
 * @description
 * # dndAdminTemplate
 *
 * Main module of the application.
 */
angular
  .module('dndAdminTemplate', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'pascalprecht.translate',
    'ui.bootstrap',
    'restangular',
    'toastr',
    'ngStorage',
    'angular-loading-bar',
    'ngFileUpload',
    'openlayers-directive'

  ])
  .config(function ($translateProvider, $stateProvider, $urlRouterProvider) {

    $translateProvider.useStaticFilesLoader({
      files: [
        {
          prefix: '/locales/locale-',
          suffix: '.json'
        }]
    });
    $translateProvider.preferredLanguage("es");

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/inner/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .state('dashboard.reports', {
        url: '/reports',
        templateUrl: 'views/inner/reports.html',
        controller: 'ReportsCtrl'
      })
  })
  .factory('authHttpInterceptor', ['$q', '$location', '$sessionStorage', 'apiKey', function ($q, $location, $sessionStorage, apiKey) {
    return {
      responseError: function (rejection) {
        if (rejection.status === 401 || rejection.status === 403) {
          $location.path('/');
        }
        return $q.reject(rejection);
      },
      request: function (req) {
        if (req.url.indexOf('/session')  > -1) {
          req.headers['API-Key'] = apiKey;
        }

        if (req.url.indexOf('/session') == -1 && $sessionStorage.session) {
          req.headers['Cookie-Id'] = $sessionStorage.session.cookieId;
        }
        return req;
      }
    }
  }])
  .config(['$httpProvider', function ($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    //$httpProvider.interceptors.push('dummyHttpInterceptor');
    $httpProvider.interceptors.push('authHttpInterceptor');
  }]);
;
