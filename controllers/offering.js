/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/gerenciar-disciplinas/:disciplineCode/oferecimentos', {'templateUrl' : 'offering/manage-list.html'});
    $routeProvider.when('/gerenciar-disciplinas/:disciplineCode/oferecimentos/criar', {'templateUrl' : 'offering/manage-create.html'});
    $routeProvider.when('/gerenciar-disciplinas/:disciplineCode/oferecimentos/:offeringCode', {'templateUrl' : 'offering/manage-details.html'});
    $routeProvider.when('/gerenciar-disciplinas/:disciplineCode/oferecimentos/:offeringCode/editar', {'templateUrl' : 'offering/manage-update.html'});
  });

  app.controller('OfferingListController', function ($routeParams, $controller, Offering) {
    angular.extend(this, $controller('DisciplineDetailsController'));
    this.offerings = Offering.query($routeParams);
    this.filterForm = $routeParams;
    this.filter = function () {
      $location.search(this.filterForm);
    };
  });

  app.controller('OfferingDetailsController', function ($routeParams, $controller, Offering) {
    angular.extend(this, $controller('DisciplineDetailsController'));
    this.offering = Offering.get($routeParams);
  });

  app.controller('OfferingDeleteController', function ($routeParams, $controller, $route) {
    angular.extend(this, $controller('DisciplineDetailsController'));
    this.remove = function (offering) {
      var params;
      params = angular.copy($routeParams);
      params.offeringCode = offering.year + '-' + offering.period + '-' + offering.code;
      offering.$delete(params, $route.reload);
    };
  });

  app.controller('OfferingCreateController', function ($scope, $routeParams, $controller, $location, Offering) {
    angular.extend(this, $controller('DisciplineDetailsController'));
    this.offering = new Offering($routeParams);

    this.offering.schedules = this.offering.schedules || [{}];

    $scope.addSchedule = function() {
      this.offering.schedules.push({});
      event.preventDefault();
    }.bind(this);

    this.save = function () {
      this.offering.$save($routeParams, $location.parent(1));
    }.bind(this);
  });

  app.controller('OfferingUpdateController', function ($scope, $routeParams, $controller, $location) {
    angular.extend(this, $controller('OfferingDetailsController'));

    this.offering.schedules = this.offering.schedules || [{}];

    $scope.addSchedule = function() {
      this.offering.schedules.push({});
      event.preventDefault();
    }.bind(this);

    this.save = function () {
      this.offering.$update($routeParams, $location.parent(2));
    }.bind(this);
  });
})(angular);