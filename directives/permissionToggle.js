/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.directive('permissionToggle', function (Session) {
    return {
      'restrict' : 'A',
      'link'     : function link($scope, element, attrs) {
        var permission;
        permission = attrs['permissionToggle'];
        $scope.$watch(Session.user, function (user) {
          user.$promise.then(function () {
            if (['show', 'hide'].indexOf(permission) > -1) {
              element.css('display', permission === 'show' ? 'none' : '');
            } else {
              element.css('display', Session.can(permission) ? '' : 'none');
            }
          }).catch(function () {
            if (['show', 'hide'].indexOf(permission) > -1) {
              element.css('display', permission === 'show' ? '' : 'none');
            } else {
              element.css('display', 'none');
            }
          });
        });
      }
    };
  });
})(angular);