/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.directive('navBar', function ($routeParams, $location, pageSize) {
    return {
      'restrict' : 'E',
      'scope'    : {'collection' : '=collection'},
      'template' : [
        '<ul class="pager">',
        '  <li class="previous disabled" ng-show="page == 0">',
        '    <a>Anteriores</a>',
        '  </li>',
        '  <li class="previous" ng-hide="page == 0">',
        '    <a ng-click="previous()">Anteriores</a>',
        '  </li>',
        '  <li class="next disabled" ng-show="collection.length < pageSize">',
        '    <a>Próximos</a>',
        '  </li>',
        '  <li class="next" ng-hide="collection.length < pageSize">',
        '    <a ng-click="next()">Próximos</a>',
        '  </li>',
        '</ul>'
      ].join(' '),
      'link'     : function (scope) {
        scope.page = $routeParams.page * 1 || 0;
        scope.pageSize = pageSize;
        scope.previous = function () {
          $location.search('page', scope.page - 1);
        };
        scope.next = function () {
          $location.search('page', scope.page + 1);
        };
      }
    };
  });
})(angular);