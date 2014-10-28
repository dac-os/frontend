/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($routeProvider) {
    $routeProvider.when('/catalogos', {'templateUrl' : 'courses/catalog-list.html'});
    $routeProvider.when('/catalogos/:catalogCode', {'templateUrl' : 'courses/catalog-details.html'});
    $routeProvider.when('/catalogos/:catalogCode/modalidades/:modalityCode', {'templateUrl' : 'courses/modality-details.html'});
    $routeProvider.when('/catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode', {'templateUrl' : 'courses/block-details.html'});
    $routeProvider.when('/catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode/requisitos/:requirementCode', {'templateUrl' : 'courses/requirement-details.html'});

    $routeProvider.when('/gerenciar-cursos', {'templateUrl' : 'courses/manage-course-list.html'});
    $routeProvider.when('/gerenciar-cursos/criar', {'templateUrl' : 'courses/manage-course-create.html'});
    $routeProvider.when('/gerenciar-cursos/:courseCode', {'templateUrl' : 'courses/manage-course-details.html'});
    $routeProvider.when('/gerenciar-cursos/:courseCode/editar', {'templateUrl' : 'courses/manage-course-update.html'});

    $routeProvider.when('/gerenciar-disciplinas', {'templateUrl' : 'courses/manage-discipline-list.html'});
    $routeProvider.when('/gerenciar-disciplinas/criar', {'templateUrl' : 'courses/manage-discipline-create.html'});
    $routeProvider.when('/gerenciar-disciplinas/:disciplineCode', {'templateUrl' : 'courses/manage-discipline-details.html'});
    $routeProvider.when('/gerenciar-disciplinas/:disciplineCode/editar', {'templateUrl' : 'courses/manage-discipline-update.html'});

    $routeProvider.when('/gerenciar-catalogos', {'templateUrl' : 'courses/manage-catalog-list.html'});
    $routeProvider.when('/gerenciar-catalogos/criar', {'templateUrl' : 'courses/manage-catalog-create.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode', {'templateUrl' : 'courses/manage-catalog-details.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/editar', {'templateUrl' : 'courses/manage-catalog-update.html'});

    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades', {'templateUrl' : 'courses/manage-modality-list.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/criar', {'templateUrl' : 'courses/manage-modality-create.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode', {'templateUrl' : 'courses/manage-modality-details.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/editar', {'templateUrl' : 'courses/manage-modality-update.html'});

    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos', {'templateUrl' : 'courses/manage-block-list.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos/criar', {'templateUrl' : 'courses/manage-block-create.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode', {'templateUrl' : 'courses/manage-block-details.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode/editar', {'templateUrl' : 'courses/manage-block-update.html'});

    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode/requisitos', {'templateUrl' : 'courses/manage-requirement-list.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode/requisitos/criar', {'templateUrl' : 'courses/manage-requirement-create.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode/requisitos/:requirementCode', {'templateUrl' : 'courses/manage-requirement-details.html'});
    $routeProvider.when('/gerenciar-catalogos/:catalogCode/modalidades/:modalityCode/blocos/:blockCode/requisitos/:requirementCode/editar', {'templateUrl' : 'courses/manage-requirement-update.html'});
  });

  app.controller('CourseListController', function ($routeParams, Course) {
    this.courses = Course.query($routeParams);
    this.remove = function (i) {
      this.courses[i].$remove($routeParams, function () {
        this.courses.splice(i, 1);
      }.bind(this));
    }.bind(this);
  });

  app.controller('CourseDetailsController', function ($routeParams, Course) {
    this.course = Course.get($routeParams);
  });

  app.controller('CourseCreateController', function ($routeParams, $location, Course) {
    this.course = new Course($routeParams);
    this.save = function () {
      this.course.$save(function () {
        $location.path('/gerenciar-cursos');
      }.bind(this));
    }.bind(this);
  });

  app.controller('CourseUpdateController', function ($routeParams, $location, Course) {
    this.course = Course.get($routeParams);
    this.save = function () {
      this.course.$update($routeParams, function () {
        $location.path('/gerenciar-cursos');
      }.bind(this));
    }.bind(this);
  });

  app.controller('DisciplineListController', function ($routeParams, Discipline) {
    this.disciplines = Discipline.query($routeParams);
    this.remove = function (i) {
      this.disciplines[i].$remove($routeParams, function () {
        this.disciplines.splice(i, 1);
      }.bind(this));
    }.bind(this);
  });

  app.controller('DisciplineDetailsController', function ($routeParams, Discipline) {
    this.discipline = Discipline.get($routeParams);
  });

  app.controller('DisciplineCreateController', function ($routeParams, $location, Discipline) {
    this.discipline = new Discipline($routeParams);
    this.save = function () {
      this.discipline.$save(function () {
        $location.path('/gerenciar-disciplinas');
      }.bind(this));
    }.bind(this);
  });

  app.controller('DisciplineUpdateController', function ($routeParams, $location, Discipline) {
    this.discipline = Discipline.get($routeParams);
    this.save = function () {
      this.discipline.$update($routeParams, function () {
        $location.path('/gerenciar-disciplinas');
      }.bind(this));
    }.bind(this);
  });

  app.controller('CatalogListController', function ($routeParams, Catalog) {
    this.catalogs = Catalog.query($routeParams);
    this.remove = function (i) {
      this.catalogs[i].$remove($routeParams, function () {
        this.catalogs.splice(i, 1);
      }.bind(this));
    }.bind(this);
  });

  app.controller('CatalogDetailsController', function ($routeParams, Catalog) {
    this.catalog = Catalog.get($routeParams);
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

  app.controller('ModalityListController', function ($routeParams, Catalog, Modality) {
    this.catalog = Catalog.get($routeParams);
    this.modalities = Modality.query($routeParams);
    this.remove = function (i) {
      this.modalities[i].$remove({
        'modalityCode' : this.modalities[i].course.code + '-' + this.modalities[i].code,
        'catalogCode'  : this.catalog.year
      }, function () {
        this.modalities.splice(i, 1);
      }.bind(this));
    }.bind(this);
  });

  app.controller('ModalityDetailsController', function ($routeParams, Catalog, Modality) {
    this.catalog = Catalog.get($routeParams);
    this.modality = Modality.get($routeParams);
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

  app.controller('BlockListController', function ($routeParams, Catalog, Modality, Block) {
    this.catalog = Catalog.get($routeParams);
    this.modality = Modality.get($routeParams);
    this.blocks = Block.query($routeParams);
    this.remove = function (i) {
      this.blocks[i].$remove($routeParams, function () {
        this.blocks.splice(i, 1);
      }.bind(this));
    }.bind(this);
  });

  app.controller('BlockDetailsController', function ($routeParams, Catalog, Modality, Block) {
    this.catalog = Catalog.get($routeParams);
    this.modality = Modality.get($routeParams);
    this.block = Block.get($routeParams);
  });

  app.controller('BlockCreateController', function ($routeParams, $location, Catalog, Modality, Block) {
    this.catalog = Catalog.get($routeParams);
    this.modality = Modality.get($routeParams);
    this.block = new Block($routeParams);
    this.save = function () {
      this.block.$save(function () {
        $location.path('/gerenciar-catalogos/' + this.catalog.year + '/modalidades/' + this.modality.course.code + '-' + this.modality.code);
      }.bind(this));
    }.bind(this);
  });

  app.controller('BlockUpdateController', function ($routeParams, $location, Catalog, Modality, Block) {
    this.catalog = Catalog.get($routeParams);
    this.modality = Modality.get($routeParams);
    this.block = Block.get($routeParams);
    this.save = function () {
      this.block.$update($routeParams, function () {
        $location.path('/gerenciar-catalogos/' + this.catalog.year + '/modalidades/' + this.modality.course.code + '-' + this.modality.code);
      }.bind(this));
    }.bind(this);
  });

  app.controller('RequirementListController', function ($routeParams, Catalog, Modality, Block, Requirement) {
    this.catalog = Catalog.get($routeParams);
    this.modality = Modality.get($routeParams);
    this.block = Block.get($routeParams);
    this.requirements = Requirement.query($routeParams);
    this.remove = function (i) {
      this.requirements[i].$remove({
        'requirementCode' : this.requirements[i].discipline ? this.requirements[i].discipline.code : this.requirements[i].mask,
        'blockCode'       : this.block.code,
        'modalityCode'    : this.modality.course.code + '-' + this.modality.code,
        'catalogCode'     : this.catalog.year
      }, function () {
        this.requirements.splice(i, 1);
      }.bind(this));
    }.bind(this);
  });

  app.controller('RequirementDetailsController', function ($routeParams, Catalog, Modality, Block, Requirement) {
    this.catalog = Catalog.get($routeParams);
    this.modality = Modality.get($routeParams);
    this.block = Block.get($routeParams);
    this.requirement = Requirement.get($routeParams);
  });

  app.controller('RequirementCreateController', function ($routeParams, $location, Catalog, Modality, Block, Requirement) {
    this.catalog = Catalog.get($routeParams);
    this.modality = Modality.get($routeParams);
    this.block = Block.get($routeParams);
    this.requirement = new Requirement($routeParams);
    this.save = function () {
      this.requirement.$save(function () {
        $location.path('/gerenciar-catalogos/' + this.catalog.year + '/modalidades/' + this.modality.course.code + '-' + this.modality.code + '/blocos/' + this.block.code);
      }.bind(this));
    }.bind(this);
  });

  app.controller('RequirementUpdateController', function ($routeParams, $location, Catalog, Modality, Block, Requirement) {
    this.catalog = Catalog.get($routeParams);
    this.modality = Modality.get($routeParams);
    this.block = Block.get($routeParams);
    this.requirement = Requirement.get($routeParams);
    this.save = function () {
      this.requirement.$update($routeParams, function () {
        $location.path('/gerenciar-catalogos/' + this.catalog.year + '/modalidades/' + this.modality.course.code + '-' + this.modality.code + '/blocos/' + this.block.code);
      }.bind(this));
    }.bind(this);
  });
})(angular);