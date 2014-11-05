/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');

  app.factory('Profile', function (authUri, $resource) {
    return $resource(authUri + '/profiles/:profileCode', {'profileCode' : '@slug'}, {
      'update' : {'method' : 'PUT'}
    });
  });
})(angular);