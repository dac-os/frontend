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

  app.service('Session', function () {
    this.hasSession = function () {
      return !!session;
    };

    this.can = function (permission) {
      return !!session && !!session.profile && !!session.profile.permissions && session.profile.permissions.indexOf(permission) > -1;
    };
  });
})(angular);