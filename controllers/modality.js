/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/catalogos/:catalogCode/modalidades/:modalityCode', {'templateUrl' : 'modality/details.html'});

    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades', {'templateUrl' : 'modality/manage-list.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/criar', {'templateUrl' : 'modality/manage-create.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode', {'templateUrl' : 'modality/manage-details.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/editar', {'templateUrl' : 'modality/manage-update.html'});
  });

  app.controller('ModalityListController', function ($routeParams, Catalog, Modality) {
    this.catalog = Catalog.get($routeParams);
    this.modalities = Modality.query($routeParams);
  });

  app.controller('ModalityDetailsController', function ($routeParams, Catalog, Modality) {
    this.catalog = Catalog.get($routeParams);
    this.modality = Modality.get($routeParams);
  });

  app.controller('ModalityDeleteController', function ($routeParams, $route) {
    this.remove = function (modality) {
      var params;
      params = angular.copy($routeParams);
      params.modalityCode = modality.course.code + '-' + modality.code;
      modality.$delete(params, $route.reload);
    };
  });

  app.controller('ModalityCreateController', function ($routeParams, $location, Catalog, Modality) {
    this.catalog = Catalog.get($routeParams);
    this.modality = new Modality($routeParams);
    this.save = function () {
      this.modality.$save(function () {
        $location.path('/gerenciar-catalogos/' + this.catalog.year);
      }.bind(this));
    }.bind(this);
  });

  app.controller('ModalityUpdateController', function ($routeParams, $location, Catalog, Modality) {
    this.catalog = Catalog.get($routeParams);
    this.modality = Modality.get($routeParams);
    this.save = function () {
      this.modality.$update($routeParams, function () {
        $location.path('/gerenciar-catalogos/' + this.catalog.year);
      }.bind(this));
    }.bind(this);
  });
})(angular);