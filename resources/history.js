/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');

  app.factory('History', function (enrollmentUri, $resource) {
    return $resource(enrollmentUri + '/users/:user/histories/:year');
  });
})(angular);