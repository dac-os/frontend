/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');

  app.factory('Profile', function (authUri, $resource) {
    return $resource(authUri + '/profiles/:slug');
  });

  app.factory('User', function (authUri, $resource) {
    return $resource(authUri + '/users/:slug');
  });
})(angular);