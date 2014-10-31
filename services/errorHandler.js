/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('RequestErrorHandler');
  });

  app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.error = null;
    });
  });

  app.factory('RequestErrorHandler', function ($rootScope, $q) {
    return {
      'responseError' : function (rejection) {
        $rootScope.error = rejection.data || {};
        $rootScope.error.duplicated = rejection.status == 409;
        return $q.reject(rejection);
      }
    }
  });
})(angular);