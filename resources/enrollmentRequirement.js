
/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');

  app.factory('EnrollmentRequirement', function (enrollmentUri, $resource) {
    return $resource(enrollmentUri + '/users/:academicRegistry/enrollments/:enrollmentCode', {'academicRegistry': '@academicRegistry', 'enrollmentCode' : '@enrollmentCode'}, {
      'update' : {'method' : 'PUT'},
      'save'   : {'method' : 'POST', 'url' : enrollmentUri + '/users/:academicRegistry/enrollments'}
    });
  });
})(angular);