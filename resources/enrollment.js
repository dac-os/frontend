/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');

  app.factory('Enrollment', function (enrollmentUri, $resource) {
    return $resource(enrollmentUri + '/users/:user/enrollments/:year-:period');
  });
})(angular);