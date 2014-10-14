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

  app.factory('Modality', function (coursesUri, $resource) {
    return $resource(coursesUri + '/catalogs/:catalogCode/modalities/:modalityCode', {'modalityCode' : '@code', 'catalogCode' : '@catalogCode'}, {
      'update' : {'method' : 'PUT'},
      'save'   : {'method' : 'POST', 'url' : coursesUri + '/catalogs/:catalogCode/modalities'}
    });
  });

  app.factory('Block', function (coursesUri, $resource) {
    return $resource(coursesUri + '/catalogs/:catalogCode/modalities/:modalityCode/blocks/:blockCode');
  });

  app.factory('Requirement', function (coursesUri, $resource) {
    return $resource(coursesUri + '/catalogs/:catalogCode/modalities/:modalityCode/blocks/:blockCode/requirements/:requirementCode');
  });

  app.factory('Course', function (coursesUri, $resource) {
    return $resource(coursesUri + '/courses/:courseCode', {'courseCode' : '@code'}, {
      'update' : {'method' : 'PUT'},
      'save'   : {'method' : 'POST', 'url' : coursesUri + '/courses'}
    });
  });

  app.factory('Discipline', function (coursesUri, $resource) {
    return $resource(coursesUri + '/disciplines/:disciplineCode', {'disciplineCode' : '@code'}, {
      'update' : {'method' : 'PUT'},
      'save'   : {'method' : 'POST', 'url' : coursesUri + '/disciplines'}
    });
  });
})(angular);