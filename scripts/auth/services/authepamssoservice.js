'use strict';

angular.module('appsngen.portal.auth.services')

    .factory('authEpamSSOService', function (Restangular) {
        var tokenService = Restangular.one('epam-sso-tokens');

        return {
            authenticate: function (authData) {
                return tokenService.post('', JSON.stringify(authData));
            }
        };
    });
