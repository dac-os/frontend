/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.factory('Catalog', function (coursesUri, $resource) {
    return $resource(coursesUri + '/catalogs/:catalogCode', {'catalogCode' : '@year'}, {
      'update' : {'method' : 'PUT'},
      'save'   : {'method' : 'POST', 'url' : coursesUri + '/catalogs'}
    });
  });
})(angular);