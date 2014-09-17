/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/', {'templateUrl' : 'home/home.html'});
  });

  app.controller('HomeController', function (Catalog) {
    console.log(Catalog.query());
  });
})(angular);