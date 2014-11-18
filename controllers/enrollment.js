/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/matriculas', {'templateUrl' : 'enrollment/list.html'});
    $routeProvider.when('/matriculas/:enrollmentCode', {'templateUrl' : 'enrollment/details.html', });
    $routeProvider.when('/gerenciar-matriculas', {'templateUrl' : 'enrollment/manage-list.html'});
    $routeProvider.when('/gerenciar-matriculas/criar', {'templateUrl' : 'enrollment/manage-create.html'});
    $routeProvider.when('/gerenciar-matriculas/:enrollmentCode', {'templateUrl' : 'enrollment/manage-details.html'});
    $routeProvider.when('/gerenciar-matriculas/:enrollmentCode/editar', {'templateUrl' : 'enrollment/manage-update.html'});
  });

  app.controller('EnrollmentListController', function ($routeParams, Enrollment) {
    this.enrollments = Enrollment.query($routeParams);
  });

  app.controller('EnrollmentDetailsController', function ($routeParams, Enrollment) {
    this.enrollment = Enrollment.get($routeParams);
  });

  app.controller('EnrollmentDeleteController', function ($routeParams, $route) {
    this.remove = function (enrollment) {
      var params;
      params = angular.copy($routeParams);
      params.enrollmentCode = enrollment.year + '-' + enrollment.period;
      enrollment.$delete(params, $route.reload);
    };
  });

  app.controller('EnrollmentCreateController', function ($routeParams, $location, Enrollment) {
    this.enrollment = new Enrollment($routeParams);
    this.save = function () {
      this.enrollment.$save($routeParams, $location.parent(1));
    };
  });

  app.controller('EnrollmentUpdateController', function ($routeParams, $controller, $location) {
    angular.extend(this, $controller('EnrollmentDetailsController', {'$scope' : $scope}));
    this.save = function () {
      this.enrollment.$update($routeParams, $location.parent(2));
    };
  });
})(angular);