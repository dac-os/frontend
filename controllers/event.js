/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/calendarios/:calendarCode/eventos/:eventCode', {'templateUrl' : 'event/details.html'});

    $routeProvider.when('/gerenciar-calendarios/:calendarCode/eventos', {'templateUrl' : 'event/manage-list.html'});
    $routeProvider.when('/gerenciar-calendarios/:calendarCode/eventos/criar', {'templateUrl' : 'event/manage-create.html'});
    $routeProvider.when('/gerenciar-calendarios/:calendarCode/eventos/:eventCode', {'templateUrl' : 'event/manage-details.html'});
    $routeProvider.when('/gerenciar-calendarios/:calendarCode/eventos/:eventCode/editar', {'templateUrl' : 'event/manage-update.html'});
  });

  app.controller('EventListController', function ($routeParams, Calendar, Event) {
    this.calendar = Calendar.get($routeParams);
    this.events = Event.query($routeParams);
  });

  app.controller('EventDetailsController', function ($routeParams, Calendar, Event) {
    this.calendar = Calendar.get($routeParams);
    this.event = Event.get($routeParams);
  });

  app.controller('EventDeleteController', function ($routeParams, $route) {
    this.remove = function (event) {
      event.$delete($routeParams, $route.reload);
    };
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