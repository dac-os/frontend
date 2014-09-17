/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/catalogos', {'templateUrl' : 'courses/list.html'});
    $routeProvider.when('/catalogos/:year', {'templateUrl' : 'courses/catalog-details.html'});
    $routeProvider.when('/catalogos/:year/modalidades/:modalityCode', {'templateUrl' : 'courses/modality-details.html'});
    $routeProvider.when('/catalogos/:year/modalidades/:modalityCode/blocos/:blockCode', {'templateUrl' : 'courses/modality-details.html'});
  });

  app.controller('CatalogListController', function ($scope, Catalog) {
    $scope.catalogs = Catalog.query();
  });

  app.controller('CatalogDetailsController', function ($scope, $routeParams, Catalog, Modality) {
    $scope.catalog = Catalog.get($routeParams);
    $scope.modalities = Modality.query($routeParams);
  });

  app.controller('ModalityDetailsController', function ($scope, $routeParams, Modality, Block) {
    $scope.modality = Modality.get($routeParams);
    $scope.blocks = Block.query($routeParams);
  });

  app.controller('BlockDetailsController', function ($scope, $routeParams, Block, Requirement) {
    $scope.block = Block.get($routeParams);
    $scope.requirements = Requirement.get($routeParams);
  });
})(angular);