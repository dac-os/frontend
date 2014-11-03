/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.directive('removeButton', function ($route, $routeParams) {
    return {
      'restrict'   : 'E',
      'transclude' : true,
      'scope'      : {
        'element' : '=element',
        'code'    : '=code',
        'label'   : '=label'
      },
      'template'   : [
        '<span ng-click="remove()" class="btn btn-danger btn-xs">',
        '<span class="glyphicon glyphicon-trash"></span>',
        '<span ng-transclude></span>',
        '</span > '
      ].join(' '),
      'link'       : function (scope) {
        scope.remove = function () {
          var params;
          params = angular.copy($routeParams);
          params[scope.label] = scope.code;
          scope.element.$remove(params, $route.reload);
        };
      }
    };
  });
})(angular);