/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/calendarios', {'templateUrl' : 'calendar/list.html'});
    $routeProvider.when('/calendarios/:calendarCode', {'templateUrl' : 'calendar/details.html'});

    $routeProvider.when('/gerenciar-calendarios', {'templateUrl' : 'calendar/manage-list.html'});
    $routeProvider.when('/gerenciar-calendarios/criar', {'templateUrl' : 'calendar/manage-create.html'});
    $routeProvider.when('/gerenciar-calendarios/:calendarCode', {'templateUrl' : 'calendar/manage-details.html'});
    $routeProvider.when('/gerenciar-calendarios/:calendarCode/editar', {'templateUrl' : 'calendar/manage-update.html'});
  });

  app.controller('CalendarListController', function ($routeParams, Calendar) {
    this.calendars = Calendar.query($routeParams);
  });

  app.controller('CalendarDetailsController', function ($routeParams, Calendar) {
    this.calendar = Calendar.get($routeParams);
  });

  app.controller('CalendarDeleteController', function ($routeParams, $route) {
    this.remove = function (calendar) {
      calendar.$delete($routeParams, $route.reload);
    };
  });

  app.controller('CalendarCreateController', function ($routeParams, $location, Calendar) {
    this.calendar = new Calendar($routeParams);
    this.save = function () {
      this.calendar.$save($routeParams, $location.parent(1));
    }.bind(this);
  });

  app.controller('CalendarUpdateController', function ($routeParams, $controller, $location) {
    angular.extend(this, $controller('CalendarDetailsController'));
    this.save = function () {
      this.calendar.$update($routeParams, $location.parent(2));
    }.bind(this);
  });
})(angular);