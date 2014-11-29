/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.factory('Offering', function (coursesUri, $resource) {
    return $resource(coursesUri + '/disciplines/:disciplineCode/offerings/:offeringCode', {'disciplineCode' : '@code', 'offeringCode' : '@offeringCode'}, {
      'update' : {'method' : 'PUT'},
      'save'   : {'method' : 'POST', 'url' : coursesUri + '/disciplines/:disciplineCode/offerings'}
    });
  });
})(angular);