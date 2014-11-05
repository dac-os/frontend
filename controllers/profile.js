/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/gerenciar-perfis', {'templateUrl' : 'profile/manage-list.html'});
    $routeProvider.when('/gerenciar-perfis/criar', {'templateUrl' : 'profile/manage-create.html'});
    $routeProvider.when('/gerenciar-perfis/:profileCode', {'templateUrl' : 'profile/manage-details.html'});
    $routeProvider.when('/gerenciar-perfis/:profileCode/editar', {'templateUrl' : 'profile/manage-update.html'});
  });

  app.controller('ProfileListController', function ($routeParams, Profile) {
    this.profiles = Profile.query($routeParams);
  });

  app.controller('ProfileDetailsController', function ($routeParams, Profile) {
    this.profile = Profile.get($routeParams);
  });

  app.controller('ProfileDeleteController', function ($routeParams, $route) {
    this.remove = function (profile) {
      profile.$delete($routeParams, $route.reload);
    };
  });

  app.controller('ProfileCreateController', function ($routeParams, $location, Profile) {
    this.profile = new Profile($routeParams);
    this.save = function () {
      this.profile.$save($routeParams, $location.parent(1));
    }.bind(this);
  });

  app.controller('ProfileUpdateController', function ($routeParams, $controller, $location) {
    angular.extend(this, $controller('ProfileDetailsController'));
    this.save = function () {
      this.profile.$update($routeParams, $location.parent(2));
    }.bind(this);
  });
})(angular);