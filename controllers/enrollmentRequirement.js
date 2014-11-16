/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/matriculas/:enrollmentCode/disciplinas', {'templateUrl': 'enrollment-requirement/list.html'});
    $routeProvider.when('/matriculas/:enrollmentCode/disciplinas/:requirementCode', {'templateUrl': 'enrollment-requirement/details.html'});

    $routeProvider.when('/gerenciar-matriculas/:enrollmentCode/disciplinas', {'templateUrl': 'enrollment-requirement/manage-list.html'});
    $routeProvider.when('/gerenciar-matriculas/:enrollmentCode/disciplinas/:requirementCode/:criar', {'templateUrl': 'enrollment-requirement/manage-create.html'});
    $routeProvider.when('/gerenciar-matriculas/:enrollmentCode/disciplinas/:requirementCode', {'templateUrl': 'enrollment-requirement/manage-details.html'});
    $routeProvider.when('/gerenciar-matriculas/:enrollmentCode/disciplinas/:requirementCode/editar', {'templateUrl': 'enrollment-requirement/manage-update.html'});
  });

  app.controller('EnrollmentRequirementListController', function ($scope, $routeParams, $controller, Session, EnrollmentRequirement) {
    $scope.$watch(Session.user, function (user) {
      user.$promise.then(function () {
        angular.extend(this, $controller('EnrollmentDetailsController', {'$scope': $scope}));
        this.user = Session.user();
        var params;
        params = angular.copy($routeParams);
        params.user = this.user.academicRegistry;
        this.requirements = EnrollmentRequirement.query(params);
      }.bind(this));
    }.bind(this));
  });

  app.controller('EnrollmentRequirementDetailsController', function ($scope, $routeParams, $controller, Session, EnrollmentRequirement) {
    $scope.$watch(Session.user, function (user) {
      user.$promise.then(function () {
        angular.extend(this, $controller('EnrollmentDetailsController', {'$scope': $scope}));
        this.user = Session.user();
        var params;
        params = angular.copy($routeParams);
        params.user = this.user.academicRegistry;
        this.requirement = EnrollmentRequirement.get(params);
      }.bind(this));
    }.bind(this));
  });

  app.controller('EnrollmentRequirementDeleteController', function ($routeParams, $route) {
    $scope.$watch(Session.user, function (user) {
      user.$promise.then(function () {
        this.remove = function (enrollmentRequirement) {
          this.user = Session.user();
          var params;
          params = angular.copy($routeParams);
          params.user = this.user.academicRegistry;
          params.enrollmentCode = enrollmentRequirement.enrollment.year + '-' + enrollmentRequirement.enrollment.period;
          params.requirementCode = enrollmentRequirement.discpline + '-' + enrollmentRequirement.year + '-' + enrollmentRequirement.period + '-' + enrollmentRequirement.offering;
          enrollmentRequirement.$delete(params, $route.reload);
        }.bind(this);
      }.bind(this));
    }.bind(this));
  });

  app.controller('EnrollmentRequirementCreateController', function ($scope, $routeParams, $controller, $location, Session, EnrollmentRequirement) {
    $scope.$watch(Session.user, function (user) {
      user.$promise.then(function () {
        angular.extend(this, $controller('EnrollmentDetailsController', {'$scope': $scope}));
        this.user = Session.user();
        var params;
        params = angular.copy($routeParams);
        params.user = this.user.academicRegistry;
        this.requirement = new EnrollmentRequirement(params);
        this.save = function () {
          this.requirement.$save(params, $location.parent(1));
        }.bind(this);
      }.bind(this));
    }.bind(this));
  });

  app.controller('EnrollmentRequirementUpdateController', function ($scope, $routeParams, $controller, $location, Session) {
    $scope.$watch(Session.user, function (user) {
      user.$promise.then(function () {
        angular.extend(this, $controller('EnrollmentRequirementDetailsController', {'$scope': $scope}));
        this.user = Session.user();
        var params;
        params = angular.copy($routeParams);
        params.user = this.user.academicRegistry;
        this.save = function () {
          this.requirement.$update(params, $location.parent(2));
        }.bind(this);
      }.bind(this));
    }.bind(this));
  });
})(angular);