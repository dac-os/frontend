/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/matriculas/:enrollmentCode/disciplinas', {'templateUrl' : 'enrollment-requirement/list.html'});
    $routeProvider.when('/matriculas/:enrollmentCode/disciplinas/:requirementCode', {'templateUrl' : 'enrollment-requirement/details.html'});

    $routeProvider.when('/gerenciar-matriculas/:enrollmentCode/disciplinas', {'templateUrl' : 'enrollment-requirement/manage-list.html'});
    $routeProvider.when('/gerenciar-matriculas/:enrollmentCode/disciplinas/criar', {'templateUrl' : 'enrollment-requirement/manage-create.html'});
    $routeProvider.when('/gerenciar-matriculas/:enrollmentCode/disciplinas/:requirementCode', {'templateUrl' : 'enrollment-requirement/manage-details.html'});
    $routeProvider.when('/gerenciar-matriculas/:enrollmentCode/disciplinas/:requirementCode/editar', {'templateUrl' : 'enrollment-requirement/manage-update.html'});
  });

  app.controller('EnrollmentRequirementListController', function ($routeParams, $controller, EnrollmentRequirement) {
    angular.extend(this, $controller('EnrollmentDetailsController'));
    this.requirements = EnrollmentRequirement.query($routeParams);
  });

  app.controller('EnrollmentRequirementDetailsController', function ($routeParams, $controller, EnrollmentRequirement) {
    angular.extend(this, $controller('EnrollmentDetailsController'));
    this.requirement = EnrollmentRequirement.get($routeParams);
  });

  app.controller('EnrollmentRequirementDeleteController', function ($routeParams, $controller, $route) {
    angular.extend(this, $controller('EnrollmentDetailsController'));
    this.remove = function (enrollmentRequirement) {
      var params;
      params = angular.copy($routeParams);
      params.enrollmentCode = this.enrollment.year + '-' + this.enrollment.period;
      params.requirementCode = enrollmentRequirement.discipline + '-' + enrollmentRequirement.offering;
      enrollmentRequirement.$delete(params, $route.reload);
    };
  });

  app.controller('EnrollmentRequirementCreateController', function ($scope, $routeParams, $controller, $location, Discipline, Offering, EnrollmentRequirement) {
    angular.extend(this, $controller('EnrollmentDetailsController'));
    this.requirement = new EnrollmentRequirement($routeParams);

    $scope.disciplines = Discipline.query($routeParams);

    $scope.selectDisciplineChanged = function (discipline) {
      var params;
      params = angular.copy($routeParams);
      params.disciplineCode = discipline;
      $scope.offerings = Offering.query(params);
    };

    this.save = function () {
      this.requirement.$save($routeParams, $location.parent(1));
    };
  });

  app.controller('EnrollmentRequirementUpdateController', function ($scope, $routeParams, $controller, $location, Discipline, Offering) {
    angular.extend(this, $controller('EnrollmentRequirementDetailsController'));

    $scope.disciplines = Discipline.query($routeParams);

    $scope.selectDisciplineChanged = function (discipline) {
      var params;
      params = angular.copy($routeParams);
      params.disciplineCode = discipline;
      $scope.offerings = Offering.query(params);
    }.bind(this);

    this.requirement.$promise.then(function() {
      $scope.selectDisciplineChanged(this.requirement.discipline)
    }.bind(this));

    this.save = function () {
      this.requirement.$update($routeParams, $location.parent(2));
    }.bind(this);
  });
})(angular);