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

  app.controller('CatalogListController', function ($routeParams, Catalog) {
    this.catalogs = Catalog.query();
  });

  app.controller('CatalogDetailsController', function ($routeParams, Catalog) {
    this.catalog = Catalog.get($routeParams);
  });

  app.controller('ModalityListController', function ($routeParams, Modality) {
    this.modalities = Modality.query($routeParams);
  });

  app.controller('ModalityDetailsController', function ($routeParams, Modality) {
    this.modality = Modality.get($routeParams);
  });

  app.controller('BlockListController', function ($routeParams, Block) {
    this.blocks = Block.query($routeParams);
  });

  app.controller('BlockDetailsController', function ($routeParams, Block) {
    this.block = Block.get($routeParams);
  });

  app.controller('RequirementListController', function ($routeParams, Requirement) {
    this.requirements = Requirement.query($routeParams);
  });

  app.controller('RequirementDetailsController', function ($routeParams, Requirement) {
    this.requirement = Requirement.get($routeParams);
  });
})(angular);