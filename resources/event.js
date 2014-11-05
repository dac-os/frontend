/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');

  app.factory('Event', function (calendarUri, $resource) {
    return $resource(calendarUri + '/calendars/:calendarCode/events/:eventCode', {'eventCode' : '@slug', 'calendarCode' : '@calendarCode'}, {
      'update' : {'method' : 'PUT'}
    });
  });
})(angular);