'use strict';

angular.module('appsngen.portal.data.services')

    .factory('usersService', function(Restangular) {
        var restService = Restangular.one('users');

        return {
            getUsers: function(params) {
                return restService.get(params);
            },
            createUser: function (user) {
                return restService.customPOST(user);
            },
            deleteUser: function (username) {
                return restService.one(username).remove();
            },
            updatePassword: function (user) {
                return restService.one(user.username).one('password').customPUT(angular.toJson(user));
            },
            updateUser: function (user) {
                return restService.one(user.username).customPUT(user);
            }
        };
    });
