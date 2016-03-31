'use strict';

angular.module('appsngen.portal.auth.services')

.factory('authSession', function(localStorageService) {
    var KEY = 'authData';
    var authData = localStorageService.get(KEY);

    return {
        create: function(accessToken, identityToken, isAnonymous) {
            authData = {
                accessToken: accessToken,
                identityToken: identityToken,
                isAnonymous : isAnonymous
            };

            localStorageService.set(KEY, authData);
        },
        destroy: function() {
            authData = undefined;
            localStorageService.remove(KEY);
        },
        getAccessToken: function() {
            return authData ? authData.accessToken : '';
        },
        getIdentityToken: function() {
            return authData ? authData.identityToken : '';
        },
        setDisplayName: function(displayName) {
            if (authData) {
                authData.displayName = displayName;
                localStorageService.set(KEY, authData);
            }
        },
        getDisplayName: function() {
            return authData ? authData.displayName : '';
        },
        setOrganizationId: function(organizationId) {
            if (authData) {
                authData.organizationId = organizationId;
                localStorageService.set(KEY, authData);
            }
        },
        getOrganizationId: function() {
            return authData ? authData.organizationId : '';
        },
        setOrganizationDisplayName: function(organizationDisplayName) {
            if (authData) {
                authData.organizationDisplayName = organizationDisplayName;
                localStorageService.set(KEY, authData);
            }
        },
        getOrganizationDisplayName: function() {
            return authData ? authData.organizationDisplayName : '';
        },
        setUserRoles: function(userRoles) {
            var i;
            if (authData) {
                authData.userRoles = [];
                for (i = 0; i < userRoles.length; i++) {
                    if (userRoles[i].hasOwnProperty('name')) {
                        authData.userRoles.push(userRoles[i].name);
                    }
                }
                localStorageService.set(KEY, authData);
            }
        },
        getUserRoles: function() {
            return authData ? authData.userRoles : [];
        },
        setPreferredSite: function(preferredSite) {
            if (authData) {
                authData.preferredSite = preferredSite;
                localStorageService.set(KEY, authData);
            }
        },
        getPreferredSite: function() {
            return authData ? authData.preferredSite : '';
        },
        setUsername: function(userame) {
            if (authData) {
                authData.userame = userame;
                localStorageService.set(KEY, authData);
            }
        },
        getUsername: function() {
            return authData ? authData.userame : '';
        },
        isAuthenticated: function() {
            if(!authData || authData.isAnonymous){
                return false;
            }

            return this.getAccessToken() ? true : false;
        },
        isAdmin: function() {
            return this.getUserRoles().indexOf('ROLE_APPSTORE_ADMIN') >= 0;
        },
        isOrganizationAdmin: function() {
            return this.getUserRoles().indexOf('ROLE_ADMIN') >= 0;
        },
        isSalesUser: function() {
            return this.getUserRoles().indexOf('ROLE_SALES') >= 0;
        }
    };
});
