
/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');

  app.factory('EnrollmentRequirement', function (enrollmentUri, $resource) {
    return $resource(enrollmentUri + '/users/:user/enrollments/:enrollmentCode/requirements/:requirementCode', {'user': '@user', 'enrollmentCode' : '@enrollmentCode', 'requirementCode' : '@requirementCode'}, {
      'update' : {'method' : 'PUT'},
      'save'   : {'method' : 'POST', 'url' : enrollmentUri + '/users/:user/enrollments'}
    });
  });
})(angular);