/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode', {'templateUrl' : 'block/details.html'});

    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos', {'templateUrl' : 'block/manage-list.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos/criar', {'templateUrl' : 'block/manage-create.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode', {'templateUrl' : 'block/manage-details.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode/editar', {'templateUrl' : 'block/manage-update.html'});
  });

  app.controller('BlockListController', function ($routeParams, $controller, Block) {
    angular.extend(this, $controller('ModalityDetailsController'));
    this.blocks = Block.query($routeParams);
  });

  app.controller('BlockDetailsController', function ($routeParams, $controller, Block) {
    angular.extend(this, $controller('ModalityDetailsController'));
    this.block = Block.get($routeParams);
  });

  app.controller('BlockDeleteController', function ($routeParams, $route) {
    this.remove = function (block) {
      block.$delete($routeParams, $route.reload);
    };
  });

  app.controller('BlockCreateController', function ($routeParams, $controller, $location, Block) {
    angular.extend(this, $controller('ModalityDetailsController'));
    this.block = new Block($routeParams);
    this.save = function () {
      this.block.$save($routeParams, $location.parent(2));
    }.bind(this);
  });

  app.controller('BlockUpdateController', function ($routeParams, $controller, $location) {
    angular.extend(this, $controller('BlockDetailsController'));
    this.save = function () {
      this.block.$update($routeParams, $location.parent(3));
    }.bind(this);
  });
})(angular);