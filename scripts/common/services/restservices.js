'use strict';

angular.module('appsngen.portal.common.services')

.factory('userService', function(Restangular) {
    return Restangular.service('users');
});