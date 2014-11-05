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

  app.controller('EventListController', function ($routeParams, $controller, Event) {
    angular.extend(this, $controller('CalendarDetailsController'));
    this.events = Event.query($routeParams);
  });

  app.controller('EventDetailsController', function ($routeParams, $controller, Event) {
    angular.extend(this, $controller('CalendarDetailsController'));
    this.event = Event.get($routeParams);
  });

  app.controller('EventDeleteController', function ($routeParams, $route) {
    this.remove = function (event) {
      event.$delete($routeParams, $route.reload);
    };
  });

  app.controller('EventCreateController', function ($routeParams, $controller, $location, Event) {
    angular.extend(this, $controller('CalendarDetailsController'));
    this.event = new Event($routeParams);
    this.save = function () {
      this.event.$save($routeParams, $location.parent(1));
    }.bind(this);
  });

  app.controller('EventUpdateController', function ($routeParams, $controller, $location) {
    angular.extend(this, $controller('EventDetailsController'));
    this.save = function () {
      this.event.$update($routeParams, $location.parent(2));
    }.bind(this);
  });
})(angular);