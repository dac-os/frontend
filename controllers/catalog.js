/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/catalogos', {'templateUrl' : 'catalog/list.html'});
    $routeProvider.when('/catalogos/:catalogCode', {'templateUrl' : 'catalog/details.html'});

    $routeProvider.when('/gerenciar-catalogos', {'templateUrl' : 'catalog/manage-list.html'});
    $routeProvider.when('/gerenciar-catalogos/criar', {'templateUrl' : 'catalog/manage-create.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode', {'templateUrl' : 'catalog/manage-details.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/editar', {'templateUrl' : 'catalog/manage-update.html'});
  });

  app.controller('CatalogListController', function ($routeParams, Catalog) {
    this.catalogs = Catalog.query($routeParams);
  });

  app.controller('CatalogDetailsController', function ($routeParams, Catalog) {
    this.catalog = Catalog.get($routeParams);
  });

  app.controller('CatalogDeleteController', function ($routeParams, $route) {
    this.remove = function (catalog) {
      catalog.$delete($routeParams, $route.reload);
    };
  });

  app.controller('CatalogCreateController', function ($routeParams, $location, Catalog) {
    this.catalog = new Catalog($routeParams);
    this.save = function () {
      this.catalog.$save(function () {
        $location.path('/gerenciar-catalogos');
      }.bind(this));
    }.bind(this);
  });

  app.controller('CatalogUpdateController', function ($routeParams, $location, Catalog) {
    this.catalog = Catalog.get($routeParams);
    this.save = function () {
      this.catalog.$update($routeParams, function () {
        $location.path('/gerenciar-catalogos');
      }.bind(this));
    }.bind(this);
  });
})(angular);