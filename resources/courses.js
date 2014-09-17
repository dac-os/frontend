/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');

  app.factory('Catalog', function (coursesUri, $resource) {
    return $resource(coursesUri + '/catalogs/:year');
  });

  app.factory('Modality', function (coursesUri, $resource) {
    return $resource(coursesUri + '/catalogs/:year/modalities/:modalityCode');
  });

  app.factory('Block', function (coursesUri, $resource) {
    return $resource(coursesUri + '/catalogs/:year/modalities/:modalityCode/blocks/:blockCode');
  });

  app.factory('Requirement', function (coursesUri, $resource) {
    return $resource(coursesUri + '/catalogs/:year/modalities/:modalityCode/blocks/:blockCode/requirements/:requirementCode');
  });

  app.factory('Course', function (coursesUri, $resource) {
    return $resource(coursesUri + '/courses/:code');
  });

  app.factory('Discipline', function (coursesUri, $resource) {
    return $resource(coursesUri + '/disciplines/:code');
  });
})(angular);