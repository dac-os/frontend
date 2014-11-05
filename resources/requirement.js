/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.factory('Requirement', function (coursesUri, $resource) {
    return $resource(coursesUri + '/catalogs/:catalogCode/modalities/:modalityCode/blocks/:blockCode/requirements/:requirementCode', {'requirementCode' : '@code', 'blockCode' : '@blockCode', 'modalityCode' : '@modalityCode', 'catalogCode' : '@catalogCode'}, {
      'update' : {'method' : 'PUT', 'transformRequest' : function (data) {
        var res;
        res = angular.copy(data);
        res.discipline = data && data.discipline && data.discipline.code ? data.discipline.code : null;
        return angular.toJson(res);
      }},
      'save'   : {'method' : 'POST', 'url' : coursesUri + '/catalogs/:catalogCode/modalities/:modalityCode/blocks/:blockCode/requirements'},
    });
  });
})(angular);