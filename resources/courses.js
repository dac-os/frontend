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

  app.factory('Modality', function (coursesUri, $resource, Session) {
    return $resource(coursesUri + '/catalogs/:catalogCode/modalities/:modalityCode', {'modalityCode' : '@code', 'catalogCode' : '@catalogCode'}, {
      'update' : {'method' : 'PUT', 'transformRequest' : function (data, headers) {
        var res;
        res = angular.copy(data);
        if (data && data.course && data.course.code) {
          res.course = data.course.code;
        }
        headers()['csrf-token'] = Session.getCredentials();
        return angular.toJson(res);
      }},
      'save'   : {'method' : 'POST', 'url' : coursesUri + '/catalogs/:catalogCode/modalities'}
    });
  });

  app.factory('Block', function (coursesUri, $resource) {
    return $resource(coursesUri + '/catalogs/:catalogCode/modalities/:modalityCode/blocks/:blockCode', {'blockCode' : '@code', 'modalityCode' : '@modalityCode', 'catalogCode' : '@catalogCode'}, {
      'update' : {'method' : 'PUT'},
      'save'   : {'method' : 'POST', 'url' : coursesUri + '/catalogs/:catalogCode/modalities/:modalityCode/blocks'}
    });
  });

  app.factory('Requirement', function (coursesUri, $resource, Session) {
    return $resource(coursesUri + '/catalogs/:catalogCode/modalities/:modalityCode/blocks/:blockCode/requirements/:requirementCode', {'requirementCode' : '@code', 'blockCode' : '@blockCode', 'modalityCode' : '@modalityCode', 'catalogCode' : '@catalogCode'}, {
      'update' : {'method' : 'PUT', 'transformRequest' : function (data, headers) {
        var res;
        res = angular.copy(data);
        if (data && data.discipline && data.discipline.code) {
          res.discipline = data.discipline.code;
        }
        headers()['csrf-token'] = Session.getCredentials();
        return angular.toJson(res);
      }},
      'save'   : {'method' : 'POST', 'url' : coursesUri + '/catalogs/:catalogCode/modalities/:modalityCode/blocks/:blockCode/requirements'}
    });
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