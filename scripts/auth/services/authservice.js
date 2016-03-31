'use strict';

angular.module('appsngen.portal.auth.services')

    .factory('authService', function (CONFIG, tokenService, $q) {
        var accessData = {
            scope: {
                services: [
                    'mobile-applications', 'dashboards', 'preferences', 'widgets', 'data-source-orders',
                    'widget-orders', 'data-source-subscriptions', 'widget-subscriptions', 'search', 'access', 'users',
                    'gadget-management', 'data-sources', 'themes', 'organizations', 'mobile-applications', 'audit',
                    'configuration', 'categories'
                ]
            }
        };

        var anonymousUserAccessData = {
            scope: {
                services: [
                    'preferences', 'widgets', 'users'
                ]
            }
        };

        var identityData = {
            scope: {
                identity: true
            }
        };

        return {
            authenticate: function (user) {
                return $q.all([
                    tokenService.create(user.username, user.password, accessData),
                    tokenService.create(user.username, user.password, identityData)
                ]);
            },
            authenticateWithThirdPartyToken: function (organizationId, token) {
                var deferred = $q.defer();

                tokenService.createUsingThirdPartyToken(organizationId, token, accessData)
                    .then(function (firstRequestResponse) {
                        tokenService.createUsingThirdPartyToken(organizationId, token, identityData)
                            .then(function (secondRequestResponse) {
                                deferred.resolve([firstRequestResponse, secondRequestResponse]);
                            }, function () {
                                deferred.reject();
                            });
                    }, function () {
                        deferred.reject();
                    });

                return deferred.promise;
            },
            authenticateAnonymousUser: function (username) {
                return tokenService.createUsingMasterToken(anonymousUserAccessData, null, null, username);
            }
        };
    });
