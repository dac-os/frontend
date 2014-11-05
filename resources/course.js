/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.factory('Course', function (coursesUri, $resource) {
    return $resource(coursesUri + '/courses/:courseCode', {'courseCode' : '@code'}, {
      'update' : {'method' : 'PUT'},
      'save'   : {'method' : 'POST', 'url' : coursesUri + '/courses'}
    });
  });
})(angular);