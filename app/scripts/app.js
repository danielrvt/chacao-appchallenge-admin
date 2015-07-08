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
      .state('dashboard.sample', {
        url: '/restaurants',
        templateUrl: 'views/inner/sample.html',
        controller: 'SampleCtrl'
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
        //TODO Custom headers
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
