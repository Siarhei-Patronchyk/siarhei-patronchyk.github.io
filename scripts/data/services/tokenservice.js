'use strict';

angular.module('appsngen.portal.data.services')

    .factory('tokenService', function(Restangular, CONFIG, $base64, authSession) {
        var tokensService = Restangular.all('tokens');

        var escapingTheStringBeforeEncoding = function (str) {
            return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
                return String.fromCharCode('0x' + p1);
            });
        };

        return {
            create: function(username, password, data) {
                // base64 encode non latin symbols
                // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
                var escapingString = escapingTheStringBeforeEncoding(username + ':' + password);
                var headers = {
                    Authorization: 'Basic ' + $base64.encode(escapingString)
                };
                return tokensService.post(data, {}, headers);
            },

            createUsingMasterToken: function(data, lifetime, skipSubscriptionsCheck, username) {
                var headers = {Authorization: 'Bearer ' + CONFIG.masterToken};
                var params = {user: username || authSession.getUsername()};

                if (lifetime) {
                    params.lifetime = lifetime;
                }

                if (skipSubscriptionsCheck) {
                    params.skipSubscriptionsCheck = skipSubscriptionsCheck;
                }
                return tokensService.customPOST(data, 'using-master-token', params, headers);
            },
            createUsingThirdPartyToken : function (organizationId, token, data) {
                var headers = {Authorization: 'Bearer ' + token};

                return tokensService.customPOST(data, 'organizations/' + organizationId, {}, headers);
            }
        };
    });
