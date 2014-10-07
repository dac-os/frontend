/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/entrar', {'templateUrl' : 'auth/login.html'});
    $routeProvider.when('/gerenciar-perfis', {'templateUrl' : 'auth/manage-profile-list.html'});
    $routeProvider.when('/gerenciar-perfis/criar', {'templateUrl' : 'auth/manage-profile-create.html'});
    $routeProvider.when('/gerenciar-perfis/:profileCode', {'templateUrl' : 'auth/manage-profile-details.html'});
    $routeProvider.when('/gerenciar-perfis/:profileCode/editar', {'templateUrl' : 'auth/manage-profile-update.html'});
  });

  app.controller('AuthLoginController', function ($location, User) {
    this.user = new User();
    this.login = function () {
      this.user.$login(function () {
        $location.path('/');
      }, function () {
        this.message = 'nao autorizado.';
      });
    };
  });

  app.controller('ProfileListController', function ($routeParams, Profile) {
    this.profiles = Profile.query($routeParams);
    this.remove = function (i) {
      this.profiles[i].$remove(function () {
        this.profiles.splice(i, 1);
      }.bind(this));
    }.bind(this);
  });

  app.controller('ProfileDetailsController', function ($routeParams, Profile) {
    this.profile = Profile.get($routeParams);
  });

  app.controller('ProfileCreateController', function ($routeParams, $location, Profile) {
    this.profile = new Profile($routeParams);
    this.save = function () {
      this.profile.$save(function () {
        $location.path('/gerenciar-perfis');
      }.bind(this));
    }.bind(this);
  });

  app.controller('ProfileUpdateController', function ($routeParams, $location, Profile) {
    this.profile = Profile.get($routeParams);
    this.save = function () {
      this.profile.$update(function () {
        $location.path('/gerenciar-perfis');
      }.bind(this));
    }.bind(this);
  });
})(angular);