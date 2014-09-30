/*globals angular:false*/
(function (angular) {
  'use strict';

  var app, credentials, session;
  app = angular.module('dacos');
  app.config(function ($httpProvider) {
    $httpProvider.defaults.transformRequest = function (data, headers) {
      headers()['csrf-token'] = credentials;
      return angular.toJson(data);
    };
  });

  app.run(function ($rootScope, Session) {
    $rootScope.session = Session;
  });

  app.factory('Credentials', function (authUri, $http) {
    return function (token) {
      credentials = token;
      $http.get(authUri + '/users/me').success(function (data) {
        session = data;
      });
    };
  });

  app.factory('Session', function () {
    return session;
  });
})(angular);