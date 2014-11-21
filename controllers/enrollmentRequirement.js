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

  app.controller('EnrollmentRequirementCreateController', function ($routeParams, $controller, $location, EnrollmentRequirement) {
    angular.extend(this, $controller('EnrollmentDetailsController'));
    this.requirement = new EnrollmentRequirement($routeParams);
    this.save = function () {
      this.requirement.$save($routeParams, $location.parent(1));
    };
  });

  app.controller('EnrollmentRequirementUpdateController', function ($routeParams, $controller, $location) {
    angular.extend(this, $controller('EnrollmentRequirementDetailsController'));
    this.save = function () {
      this.requirement.$update($routeParams, $location.parent(2));
    }.bind(this);
  });
})(angular);