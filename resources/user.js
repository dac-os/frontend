/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.factory('User', function (authUri, $resource) {
    return $resource(authUri + '/users/:userCode', null, {
      'login' : {
        'method' : 'POST',
        'url'    : authUri + '/users/me/session'
      }
    });
  });
})(angular);