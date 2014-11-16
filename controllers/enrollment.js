/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/matriculas', {'templateUrl': 'enrollment/list.html'});
    $routeProvider.when('/matriculas/:enrollmentCode', {'templateUrl': 'enrollment/details.html',});
    $routeProvider.when('/gerenciar-matriculas', {'templateUrl': 'enrollment/manage-list.html'});
    $routeProvider.when('/gerenciar-matriculas/criar', {'templateUrl': 'enrollment/manage-create.html'});
    $routeProvider.when('/gerenciar-matriculas/:enrollmentCode', {'templateUrl': 'enrollment/manage-details.html'});
    $routeProvider.when('/gerenciar-matriculas/:enrollmentCode/editar', {'templateUrl': 'enrollment/manage-update.html'});
  });

  app.controller('EnrollmentListController', function ($scope, $routeParams, Session, Enrollment) {
    $scope.$watch(Session.user, function (user) {
      user.$promise.then(function () {
        this.user = user;
        var params;
        params = angular.copy($routeParams);
        params.user = this.user.academicRegistry;
        this.enrollments = Enrollment.query(params);
      }.bind(this));
    }.bind(this));

  });

  app.controller('EnrollmentDetailsController', function ($scope, $routeParams, Session, Enrollment) {
    $scope.$watch(Session.user, function (user) {
      user.$promise.then(function () {
        this.user = Session.user();
        var params;
        params = angular.copy($routeParams);
        params.user = this.user.academicRegistry;
        this.enrollment = Enrollment.get(params);
      }.bind(this));
    }.bind(this));
  });

  app.controller('EnrollmentDeleteController', function ($scope, $routeParams, $route, Session) {
    $scope.$watch(Session.user, function (user) {
      user.$promise.then(function () {
        this.remove = function (enrollment) {
          this.user = Session.user();
          var params;
          params = angular.copy($routeParams);
          params.user = this.user.academicRegistry;
          params.enrollmentCode = enrollment.year + '-' + enrollment.period;

          enrollment.$delete(params, $route.reload);
        }.bind(this);
      }.bind(this));
    }.bind(this));
  });

  app.controller('EnrollmentCreateController', function ($scope, $routeParams, $location, Session, Enrollment) {
    $scope.$watch(Session.user, function (user) {
      user.$promise.then(function () {
        this.user = Session.user();
        var params;
        params = angular.copy($routeParams);
        params.user = this.user.academicRegistry;
        this.enrollment = new Enrollment(params);
        this.save = function () {
          this.enrollment.$save($routeParams, $location.parent(1));
        }.bind(this);
      }.bind(this));
    }.bind(this));
  });

  app.controller('EnrollmentUpdateController', function ($scope, $routeParams, $controller, $location, Session) {
    $scope.$watch(Session.user, function (user) {
      user.$promise.then(function () {
        angular.extend(this, $controller('EnrollmentDetailsController', {'$scope': $scope}));
        this.save = function () {
          this.enrollment.$update($routeParams, $location.parent(2));
        }.bind(this);
      }.bind(this));
    }.bind(this));
  });
})(angular);