/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.factory('Block', function (coursesUri, $resource) {
    return $resource(coursesUri + '/catalogs/:catalogCode/modalities/:modalityCode/blocks/:blockCode', {'blockCode' : '@code', 'modalityCode' : '@modalityCode', 'catalogCode' : '@catalogCode'}, {
      'update' : {'method' : 'PUT'},
      'save'   : {'method' : 'POST', 'url' : coursesUri + '/catalogs/:catalogCode/modalities/:modalityCode/blocks'}
    });
  });
})(angular);