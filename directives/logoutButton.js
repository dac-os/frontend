/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');
  app.directive('logoutButton', function (Credentials) {
    return {
      'restrict' : 'A',
      'link'     : function link(scope, element) {
        element.on('click', function () {
          Credentials.unsetToken();
        });
      }
    };
  });
})(angular);