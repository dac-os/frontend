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

  app.controller('DisciplineListController', function ($routeParams, Discipline) {
    this.disciplines = Discipline.query($routeParams);
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
      this.discipline.$save(function () {
        $location.path('/gerenciar-disciplinas');
      }.bind(this));
    }.bind(this);
  });

  app.controller('DisciplineUpdateController', function ($routeParams, $location, Discipline) {
    this.discipline = Discipline.get($routeParams);
    this.save = function () {
      this.discipline.$update($routeParams, function () {
        $location.path('/gerenciar-disciplinas');
      }.bind(this));
    }.bind(this);
  });
})(angular);