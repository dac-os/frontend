/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos', ['ngRoute', 'ngResource', 'templates']);

  app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  });

  app.constant('authUri', '/* @echo AUTH_URI */');
  app.constant('calendarUri', '/* @echo CALENDAR_URI */');
  app.constant('coursesUri', '/* @echo COURSES_URI */');
  app.constant('enrollmentUri', '/* @echo ENROLLMENT_URI */');
  app.constant('historyUri', '/* @echo HISTORY_URI */');
})(angular);