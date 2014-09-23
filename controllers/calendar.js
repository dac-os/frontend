/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/calendarios', {'templateUrl' : 'calendar/calendar-list.html'});
    $routeProvider.when('/calendarios/:calendarCode', {'templateUrl' : 'calendar/calendar-details.html'});
    $routeProvider.when('/calendarios/:calendarCode/eventos', {'templateUrl' : 'calendar/event-list.html'});
    $routeProvider.when('/calendarios/:calendarCode/eventos/:eventCode', {'templateUrl' : 'calendar/event-details.html'});
  });

  app.controller('CalendarListController', function ($scope, Calendar) {
    $scope.calendars = Calendar.query();
  });

  app.controller('CalendarDetailsController', function ($scope, $routeParams, Calendar) {
    $scope.calendar = Calendar.get($routeParams);
  });

  app.controller('EventListController', function ($scope, $routeParams, Event) {
    $scope.events = Event.query($routeParams);
  });

  app.controller('EventDetailsController', function ($scope, $routeParams, Event) {
    $scope.event = Event.get($routeParams);
  });
})(angular);