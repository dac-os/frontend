/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('RequestCredentialsHandler');
  });

  app.service('RequestCredentialsHandler', function (authUri, Credentials) {
    this.request = function (config) {
      if (config.url === authUri + '/users/me/session') {
        config.headers['authorization'] = 'basic ' + Base64.encode(config.data.academicRegistry + ':' + config.data.password);
      }
      config.headers['csrf-token'] = Credentials.getToken();
      return config;
    };

    this.response = function (response) {
      if (response.config.url === authUri + '/users/me/session') {
        Credentials.setToken(response.data.token);
      }
      return response;
    };
  });
})(angular);