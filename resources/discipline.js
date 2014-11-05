/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.factory('Discipline', function (coursesUri, $resource) {
    return $resource(coursesUri + '/disciplines/:disciplineCode', {'disciplineCode' : '@code'}, {
      'update' : {'method' : 'PUT'},
      'save'   : {'method' : 'POST', 'url' : coursesUri + '/disciplines'}
    });
  });
})(angular);