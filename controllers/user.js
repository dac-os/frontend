/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/usuarios', {'templateUrl' : 'user/list.html'});
    $routeProvider.when('/usuarios/:userCode', {'templateUrl' : 'user/details.html'});

    $routeProvider.when('/gerenciar-usuarios', {'templateUrl' : 'user/manage-list.html'});
    $routeProvider.when('/gerenciar-usuarios/criar', {'templateUrl' : 'user/manage-create.html'});
    $routeProvider.when('/gerenciar-usuarios/:userCode', {'templateUrl' : 'user/manage-details.html'});
    $routeProvider.when('/gerenciar-usuarios/:userCode/editar', {'templateUrl' : 'user/manage-update.html'});
  });

  app.controller('UserListController', function ($routeParams, User) {
    this.users = User.query($routeParams);
  });

  app.controller('UserDetailsController', function ($routeParams, User) {
    this.user = User.get($routeParams);
  });

  app.controller('UserDeleteController', function ($routeParams, $route) {
    this.remove = function (user) {
      user.$delete($routeParams, $route.reload);
    };
  });

  app.controller('UserCreateController', function ($routeParams, $location, User) {
    this.user = new User($routeParams);
    this.save = function () {
      this.user.$save($routeParams, $location.parent(1));
    }.bind(this);
  });

  app.controller('UserUpdateController', function ($routeParams, $controller, $location) {
    angular.extend(this, $controller('UserDetailsController'));
    this.save = function () {
      this.user.$update($routeParams, $location.parent(2));
    }.bind(this);
  });
})(angular);