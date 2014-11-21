
/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');

  app.factory('EnrollmentRequirement', function (enrollmentUri, $resource, Session) {
    return $resource(enrollmentUri + '/users/:user/enrollments/:enrollmentCode/requirements/:requirementCode', {'user' : Session.academicRegistry, 'enrollmentCode' : '@enrollmentCode', 'requirementCode' : '@requirementCode'}, {
      'update' : {'method' : 'PUT'},
      'save'   : {'method' : 'POST', 'url' : enrollmentUri + '/users/:user/enrollments/:enrollmentCode/requirements'}
    });
  });
})(angular);