/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');

  app.factory('Calendar', function (calendarUri, $resource) {
    return $resource(calendarUri + '/calendars/:calendarCode');
  });

  app.factory('Event', function (calendarUri, $resource) {
    return $resource(calendarUri + '/calendars/:calendarCode/events/:eventCode');
  });
})(angular);