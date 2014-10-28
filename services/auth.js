/*globals angular:false*/
(function (angular) {
  'use strict';

  var app, credentials;
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

  app.service('Session', function ($cookies, $http, authUri) {
    var session;

    this.setCredentials = function (token) {
      credentials = token;
      $cookies.token = token;
      $http.get(authUri + '/users/me').success(function (data) {
        session = data;
      });
    };

    this.getCredentials = function () {
      return credentials;
    }

    this.unsetCredentials = function () {
      credentials = null;
      delete $cookies.token;
      session = null;
    };

    this.hasSession = function () {
      return !!session;
    };

    this.can = function (permission) {
      return !!session && !!session.profile && !!session.profile.permissions && session.profile.permissions.indexOf(permission) > -1;
    };

    if ($cookies.token) this.setCredentials($cookies.token);
  });
})(angular);