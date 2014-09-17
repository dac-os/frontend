/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/calendarios', {'templateUrl' : 'calendar/list.html'});
    $routeProvider.when('/calendarios/:year', {'templateUrl' : 'calendar/details.html'});
  });

  app.controller('CalendarListController', function ($scope, Calendar) {
    $scope.calendars = Calendar.query();
  });

  app.controller('CalendarDetailsController', function ($scope, $routeParams, Calendar, Event) {
    $scope.calendar = Calendar.get({'year' : $routeParams.year});
    $scope.events = Event.query({'year' : $routeParams.year});
  });
})(angular);