/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/gerenciar-disciplinas', {'templateUrl' : 'discipline/manage-list.html'});
    $routeProvider.when('/gerenciar-disciplinas/criar', {'templateUrl' : 'discipline/manage-create.html'});
    $routeProvider.when('/gerenciar-disciplinas/:disciplineCode', {'templateUrl' : 'discipline/manage-details.html'});
    $routeProvider.when('/gerenciar-disciplinas/:disciplineCode/editar', {'templateUrl' : 'discipline/manage-update.html'});
  });

  app.controller('DisciplineListController', function ($routeParams, $location, Discipline) {
    this.disciplines = Discipline.query($routeParams);
    this.filterForm = $routeParams;
    this.filter = function () {
      $location.search(this.filterForm);
    };
  });

  app.controller('DisciplineDetailsController', function ($routeParams, Discipline) {
    this.discipline = Discipline.get($routeParams);
  });

  app.controller('DisciplineDeleteController', function ($routeParams, $route) {
    this.remove = function (discipline) {
      discipline.$delete($routeParams, $route.reload);
    };
  });

  app.controller('DisciplineCreateController', function ($routeParams, $location, Discipline) {
    this.discipline = new Discipline($routeParams);
    this.save = function () {
      this.discipline.$save($routeParams, $location.parent(1));
    }.bind(this);
  });

  app.controller('DisciplineUpdateController', function ($routeParams, $controller, $location) {
    angular.extend(this, $controller('DisciplineDetailsController'));
    this.save = function () {
      this.discipline.$update($routeParams, $location.parent(2));
    }.bind(this);
  });
})(angular);