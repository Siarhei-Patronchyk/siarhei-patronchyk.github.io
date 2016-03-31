'use strict';

angular.module('appsngen.portal.auth.services')

    .factory('loginService', function (authSession, userService) {
        return {
            createSession: function (username, token, identityToken, isAnonymous) {
                authSession.create(token, identityToken, isAnonymous);
                return userService.one(username)
                    .get()
                    .then(function (response) {
                        authSession.setUsername(response.username);
                        authSession.setDisplayName(response.displayName);
                        authSession.setOrganizationId(response.organization.urn);
                        authSession.setOrganizationDisplayName(response.organization.displayName);
                        authSession.setUserRoles(response.authorities);
                        authSession.setPreferredSite(response.organization.preferredSite);
                    }, function () {
                        authSession.destroy();
                    });
            }
        };
    });
