/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.config(function ($provide) {
    $provide.decorator('$location', function ($delegate) {
      $delegate.parent = function (paths) {
        return function () {
          var path;
          path = $delegate.path().split('/').slice(0, -1 * paths).join('/');
          $delegate.path(path);
        };
      };
      return $delegate;
    });
  });
})(angular);