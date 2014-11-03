/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/calendarios', {'templateUrl' : 'calendar/calendar-list.html'});
    $routeProvider.when('/calendarios/:calendarCode', {'templateUrl' : 'calendar/calendar-details.html'});
    $routeProvider.when('/calendarios/:calendarCode/eventos/:eventCode', {'templateUrl' : 'calendar/event-details.html'});

    $routeProvider.when('/gerenciar-calendarios', {'templateUrl' : 'calendar/manage-calendar-list.html'});
    $routeProvider.when('/gerenciar-calendarios/criar', {'templateUrl' : 'calendar/manage-calendar-create.html'});
    $routeProvider.when('/gerenciar-calendarios/:calendarCode', {'templateUrl' : 'calendar/manage-calendar-details.html'});
    $routeProvider.when('/gerenciar-calendarios/:calendarCode/editar', {'templateUrl' : 'calendar/manage-calendar-update.html'});

    $routeProvider.when('/gerenciar-calendarios/:calendarCode/eventos', {'templateUrl' : 'calendar/manage-event-list.html'});
    $routeProvider.when('/gerenciar-calendarios/:calendarCode/eventos/criar', {'templateUrl' : 'calendar/manage-event-create.html'});
    $routeProvider.when('/gerenciar-calendarios/:calendarCode/eventos/:eventCode', {'templateUrl' : 'calendar/manage-event-details.html'});
    $routeProvider.when('/gerenciar-calendarios/:calendarCode/eventos/:eventCode/editar', {'templateUrl' : 'calendar/manage-event-update.html'});
  });

  app.controller('CalendarListController', function ($routeParams, Calendar) {
    this.calendars = Calendar.query($routeParams);
  });

  app.controller('CalendarDetailsController', function ($routeParams, Calendar) {
    this.calendar = Calendar.get($routeParams);
  });

  app.controller('CalendarCreateController', function ($routeParams, $location, Calendar) {
    this.calendar = new Calendar($routeParams);
    this.save = function () {
      this.calendar.$save(function () {
        $location.path('/gerenciar-calendarios');
      }.bind(this));
    }.bind(this);
  });

  app.controller('CalendarUpdateController', function ($routeParams, $location, Calendar) {
    this.calendar = Calendar.get($routeParams);
    this.save = function () {
      this.calendar.$update($routeParams, function () {
        $location.path('/gerenciar-calendarios');
      }.bind(this));
    }.bind(this);
  });

  app.controller('EventListController', function ($routeParams, Calendar, Event) {
    this.calendar = Calendar.get($routeParams);
    this.events = Event.query($routeParams);
  });

  app.controller('EventDetailsController', function ($routeParams, Calendar, Event) {
    this.calendar = Calendar.get($routeParams);
    this.event = Event.get($routeParams);
  });

  app.controller('EventCreateController', function ($routeParams, $location, Calendar, Event) {
    this.calendar = Calendar.get($routeParams);
    this.event = new Event($routeParams);
    this.save = function () {
      this.event.$save(function () {
        $location.path('/gerenciar-calendarios/' + this.calendar.year);
      }.bind(this));
    }.bind(this);
  });

  app.controller('EventUpdateController', function ($routeParams, $location, Calendar, Event) {
    this.calendar = Calendar.get($routeParams);
    this.event = Event.get($routeParams);
    this.save = function () {
      this.event.$update($routeParams, function () {
        $location.path('/gerenciar-calendarios/' + this.calendar.year);
      }.bind(this));
    }.bind(this);
  });
})(angular);