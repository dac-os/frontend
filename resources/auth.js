/*globals angular:false*/
(function (angular) {
  'use strict';

  var app;
  app = angular.module('dacos');

  app.factory('User', function (authUri, $resource, Credentials) {
    return $resource(authUri + '/users/:userCode', null, {
      'login' : {
        'method'            : 'POST',
        'url'               : authUri + '/users/me/session',
        'transformRequest'  : function (data, headers) {
          headers()['authorization'] = 'basic ' + Base64.encode(data.academicRegistry + ':' + data.password);
        },
        'transformResponse' : function (data) {
          if (data) {
            Credentials(angular.fromJson(data).token);
          }
        }
      }
    });
  });

  app.factory('Profile', function (authUri, $resource) {
    return $resource(authUri + '/profiles/:profileCode');
  });
})(angular);