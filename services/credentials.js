/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.service('Credentials', function ($rootScope, $cookies) {
    var credentials;

    this.setToken = function (token) {
      credentials = token;
      $cookies.token = token;
      $rootScope.$emit('changeCredentials');
    };

    this.getToken = function () {
      return credentials;
    };

    this.unsetToken = function () {
      delete $cookies.token;
      credentials = null;
      $rootScope.$emit('changeCredentials');
    };

    if ($cookies.token) {
      this.setToken($cookies.token);
    }
  });
})(angular);