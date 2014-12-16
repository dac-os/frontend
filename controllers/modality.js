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

  app.controller('ModalityListController', function ($routeParams, $controller, Modality) {
    angular.extend(this, $controller('CatalogDetailsController'));
    this.modalities = Modality.query($routeParams);
    this.filterForm = $routeParams;
    this.filter = function () {
      $location.search(this.filterForm);
    };
  });

  app.controller('ModalityDetailsController', function ($routeParams, $controller, Modality) {
    angular.extend(this, $controller('CatalogDetailsController'));
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

  app.controller('ModalityCreateController', function ($routeParams, $controller, $location, Modality) {
    angular.extend(this, $controller('CatalogDetailsController'));
    this.modality = new Modality($routeParams);
    this.save = function () {
      this.modality.$save($routeParams, $location.parent(2));
    }.bind(this);
  });

  app.controller('ModalityUpdateController', function ($routeParams, $controller, $location) {
    angular.extend(this, $controller('ModalityDetailsController'));
    this.save = function () {
      this.modality.$update($routeParams, $location.parent(3));
    }.bind(this);
  });
})(angular);