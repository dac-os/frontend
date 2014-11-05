/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode/requisitos/:requirementCode', {'templateUrl' : 'requirement/details.html'});

    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode/requisitos', {'templateUrl' : 'requirement/manage-list.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode/requisitos/criar', {'templateUrl' : 'requirement/manage-create.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode/requisitos/:requirementCode', {'templateUrl' : 'requirement/manage-details.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode/requisitos/:requirementCode/editar', {'templateUrl' : 'requirement/manage-update.html'});
  });

  app.controller('RequirementListController', function ($routeParams, $controller, Requirement) {
    angular.extend(this, $controller('BlockDetailsController'));
    this.requirements = Requirement.query($routeParams);
  });

  app.controller('RequirementDetailsController', function ($routeParams, $controller, Requirement) {
    angular.extend(this, $controller('BlockDetailsController'));
    this.requirement = Requirement.get($routeParams);
  });

  app.controller('RequirementDeleteController', function ($routeParams, $route) {
    this.remove = function (requirement) {
      var params;
      params = angular.copy($routeParams);
      params.requirementCode = requirement.discipline ? requirement.discipline.code : requirement.mask;
      requirement.$delete(params, $route.reload);
    };
  });

  app.controller('RequirementCreateController', function ($routeParams, $controller, $location, Requirement) {
    angular.extend(this, $controller('BlockDetailsController'));
    this.requirement = new Requirement($routeParams);
    this.save = function () {
      this.requirement.$save(function () {
        $location.path('/gerenciar-catalogos/' + this.catalog.year + '/modalidades/' + this.modality.course.code + '-' + this.modality.code + '/blocos/' + this.block.code);
      }.bind(this));
    }.bind(this);
  });

  app.controller('RequirementUpdateController', function ($routeParams, $controller, $location) {
    angular.extend(this, $controller('RequirementDetailsController'));
    this.save = function () {
      this.requirement.$update($routeParams, function () {
        $location.path('/gerenciar-catalogos/' + this.catalog.year + '/modalidades/' + this.modality.course.code + '-' + this.modality.code + '/blocos/' + this.block.code);
      }.bind(this));
    }.bind(this);
  });
})(angular);