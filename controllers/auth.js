/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/entrar', {'templateUrl' : 'auth/login.html'});
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
})(angular);