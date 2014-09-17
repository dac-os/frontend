/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');

  app.factory('Calendar', function (calendarUri, $resource) {
    return $resource(calendarUri + '/calendars/:year');
  });

  app.factory('Event', function (calendarUri, $resource) {
    return $resource(calendarUri + '/calendars/:year/events/:slug');
  });
})(angular);