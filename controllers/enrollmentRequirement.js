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

  app.controller('EnrollmentRequirementListController', function ($routeParams, $controller, EnrollmentRequirement) {
    angular.extend(this, $controller('EnrollmentDetailsController'));
    this.events = EnrollmentRequirement.query($routeParams);
  });

  app.controller('EnrollmentRequirementDetailsController', function ($routeParams, $controller, EnrollmentRequirement) {
    angular.extend(this, $controller('EnrollmentDetailsController'));
    this.event = EnrollmentRequirement.get($routeParams);
  });

  app.controller('EnrollmentRequirementDeleteController', function ($routeParams, $route) {
    this.remove = function (enrollmentRequirement) {
      enrollmentRequirement.$delete($routeParams, $route.reload);
    };
  });

  app.controller('EnrollmentRequirementCreateController', function ($routeParams, $controller, $location, EnrollmentRequirement) {
    angular.extend(this, $controller('EnrollmentDetailsController'));
    this.event = new EnrollmentRequirement($routeParams);
    this.save = function () {
      this.event.$save($routeParams, $location.parent(1));
    }.bind(this);
  });

  app.controller('EnrollmentRequirementUpdateController', function ($routeParams, $controller, $location) {
    angular.extend(this, $controller('EnrollmentRequirementDetailsController'));
    this.save = function () {
      this.event.$update($routeParams, $location.parent(2));
    }.bind(this);
  });
})(angular);