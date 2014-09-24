/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/entrar', {'templateUrl' : 'auth/login.html'});
  });

  app.controller('AuthLoginController', function ($scope, User) {
    $scope.user = new User({});
    $scope.login = function () {
      console.log($scope.user)
    };
  });
})(angular);