/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/cursos', {'templateUrl' : 'course/list.html'});
    $routeProvider.when('/cursos/:courseCode', {'templateUrl' : 'course/details.html'});

    $routeProvider.when('/gerenciar-cursos', {'templateUrl' : 'course/manage-list.html'});
    $routeProvider.when('/gerenciar-cursos/criar', {'templateUrl' : 'course/manage-create.html'});
    $routeProvider.when('/gerenciar-cursos/:courseCode', {'templateUrl' : 'course/manage-details.html'});
    $routeProvider.when('/gerenciar-cursos/:courseCode/editar', {'templateUrl' : 'course/manage-update.html'});
  });

  app.controller('CourseListController', function ($routeParams, $location, Course) {
    this.courses = Course.query($routeParams);
    this.filterForm = $routeParams;
    this.filter = function () {
      $location.search(this.filterForm);
    };
  });

  app.controller('CourseDetailsController', function ($routeParams, Course) {
    this.course = Course.get($routeParams);
  });

  app.controller('CourseDeleteController', function ($routeParams, $route) {
    this.remove = function (course) {
      course.$delete($routeParams, $route.reload);
    };
  });

  app.controller('CourseCreateController', function ($routeParams, $location, Course) {
    this.course = new Course($routeParams);
    this.save = function () {
      this.course.$save($routeParams, $location.parent(1));
    }.bind(this);
  });

  app.controller('CourseUpdateController', function ($routeParams, $controller, $location) {
    angular.extend(this, $controller('CourseDetailsController'));
    this.save = function () {
      this.course.$update($routeParams, $location.parent(2));
    }.bind(this);
  });
})(angular);