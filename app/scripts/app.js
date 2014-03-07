'use strict';

angular.module('ng-transform', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/transform.html',
        controller: 'transformCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
