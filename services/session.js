/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.service('Session', function ($rootScope, $cookies, User) {
    var user;

    this.can = function (permission) {
      return !!user && !!user.profile && !!user.profile.permissions && user.profile.permissions.indexOf(permission) > -1;
    };

    this.user = function () {
      return user;
    };

    this.reload = function () {
      user = User.get({'userCode' : 'me'});
      user.$promise.then(function () {
        $cookies.academicRegistry = user.academicRegistry;
      });
    };

    this.academicRegistry = function () {
      if (user && user.academicRegistry) {
        return user.academicRegistry;
      } else {
        return $cookies.academicRegistry;
      }
    };

    $rootScope.$on('changeCredentials', this.reload);
    this.reload();
  });
})(angular);
