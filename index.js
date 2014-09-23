/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos', ['ngRoute', 'ngResource', 'templates']);

  app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  });

  /* @if NODE_ENV=='production' */
  app.constant('authUri', 'http://dacos-auth.herokuapp.com');
  app.constant('calendarUri', 'http://dacos-calendar.herokuapp.com');
  app.constant('coursesUri', 'http://dacos-courses.herokuapp.com');
  app.constant('enrollmentUri', 'http://dacos-enrollment.herokuapp.com');
  app.constant('historyUri', 'http://dacos-history.herokuapp.com');
  /* @endif */

  /* @if NODE_ENV=='development' */
  app.constant('authUri', 'http://localhost:8085');
  app.constant('calendarUri', 'http://localhost:8084');
  app.constant('coursesUri', 'http://localhost:8083');
  app.constant('enrollmentUri', 'http://localhost:8082');
  app.constant('historyUri', 'http://localhost:8081');
  /* @endif */
})(angular);