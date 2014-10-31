/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos', ['ngRoute', 'ngResource', 'ngCookies', 'templates']);

  app.run(function ($rootScope, pageSize) {
    $rootScope.pageSize = pageSize
  });

  app.constant('pageSize', '/* @echo PAGE_SIZE */');
  app.constant('authUri', '/* @echo AUTH_URI */');
  app.constant('calendarUri', '/* @echo CALENDAR_URI */');
  app.constant('coursesUri', '/* @echo COURSES_URI */');
  app.constant('enrollmentUri', '/* @echo ENROLLMENT_URI */');
  app.constant('historyUri', '/* @echo HISTORY_URI */');
})(angular);