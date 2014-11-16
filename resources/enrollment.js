
/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');

  app.factory('Enrollment', function (enrollmentUri, $resource) {
    return $resource(enrollmentUri + '/users/:user/enrollments/:enrollmentCode', {'user': '@user', 'enrollmentCode' : '@enrollmentCode'}, {
      'update' : {'method' : 'PUT'},
      'save'   : {'method' : 'POST', 'url' : enrollmentUri + '/users/:user/enrollments'}
    });
  });
})(angular);