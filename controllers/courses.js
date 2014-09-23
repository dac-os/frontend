/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/catalogos', {'templateUrl' : 'courses/catalog-list.html'});
    $routeProvider.when('/catalogos/:catalogCode', {'templateUrl' : 'courses/catalog-details.html'});
    $routeProvider.when('/catalogos/:catalogCode/modalidades', {'templateUrl' : 'courses/modality-list.html'});
    $routeProvider.when('/catalogos/:catalogCode/modalidades/:modalityCode', {'templateUrl' : 'courses/modality-details.html'});
    $routeProvider.when('/catalogos/:catalogCode/modalidades/:modalityCode/blocos', {'templateUrl' : 'courses/block-list.html'});
    $routeProvider.when('/catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode', {'templateUrl' : 'courses/block-details.html'});
    $routeProvider.when('/catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode/requisitos', {'templateUrl' : 'courses/requirement-list.html'});
    $routeProvider.when('/catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode/requisitos/:requirementCode', {'templateUrl' : 'courses/requirement-details.html'});
  });

  app.controller('CatalogListController', function ($scope, $routeParams, Catalog) {
    $scope.catalogs = Catalog.query();
  });

  app.controller('CatalogDetailsController', function ($scope, $routeParams, Catalog) {
    $scope.catalog = Catalog.get($routeParams);
  });

  app.controller('ModalityListController', function ($scope, $routeParams, Modality) {
    $scope.modalities = Modality.query($routeParams);
  });

  app.controller('ModalityDetailsController', function ($scope, $routeParams, Modality) {
    $scope.modality = Modality.get($routeParams);
  });

  app.controller('BlockListController', function ($scope, $routeParams, Block) {
    $scope.blocks = Block.query($routeParams);
  });

  app.controller('BlockDetailsController', function ($scope, $routeParams, Block) {
    $scope.block = Block.get($routeParams);
  });

  app.controller('RequirementListController', function ($scope, $routeParams, Requirement) {
    $scope.requirements = Requirement.query($routeParams);
  });

  app.controller('RequirementDetailsController', function ($scope, $routeParams, Requirement) {
    $scope.requirement = Requirement.get($routeParams);
  });
})(angular);