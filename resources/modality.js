/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.factory('Modality', function (coursesUri, $resource) {
    return $resource(coursesUri + '/catalogs/:catalogCode/modalities/:modalityCode', {'modalityCode' : '@code', 'catalogCode' : '@catalogCode'}, {
      'update' : {'method' : 'PUT', 'transformRequest' : function (data) {
        var res;
        res = angular.copy(data);
        res.course = data && data.course && data.course.code ? data.course.code : null;
        return angular.toJson(res);
      }},
      'save'   : {'method' : 'POST', 'url' : coursesUri + '/catalogs/:catalogCode/modalities'}
    });
  });
})(angular);