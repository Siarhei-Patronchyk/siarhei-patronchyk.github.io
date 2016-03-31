'use strict';

angular.module('appsngen.portal.auth.controllers')

    .controller('LoginEpamSSOCallbackCtrl', function ($rootScope, $base64, authService, authSession, authEpamSSOService, //jshint ignore:line
                                                      loginService, $state, $stateParams, notifier, CONFIG) {
        var code = $stateParams.code;
        var error = $stateParams.error;
        var errorDesc = $stateParams.error_description; //jshint ignore:line

        var parseToken = function (token) {
            var base64data = token.accessToken.split('.')[1];
            var parsedToken;

            while (base64data.length % 4 !== 0) {
                base64data += '=';
            }

            try {
                parsedToken = JSON.parse($base64.decode(base64data));
            } catch (e) {
                parsedToken = null;
            }

            return parsedToken;
        };

        if (authSession.isAuthenticated()) {
            $state.go('home');

            return;
        }

        if (error) {
            notifier.error(errorDesc || 'Can\'t get EPAM\'s code for access token.');
            $state.go('login');

            return;
        }

        if (code) {
            authEpamSSOService.authenticate({
                /* jshint camelcase: false */
                client_id: CONFIG.epamSSOClientId,
                redirect_uri: $state.href('loginEpamSSOCallback', {code: ''}, {absolute: true}),
                code: code,
                grant_type: 'authorization_code'
                /* jshint camelcase: true */
            }).then(function (response) {
                authService.authenticateWithThirdPartyToken(CONFIG.epamSSOOrganizationId, response.access_token) //jshint ignore:line
                    .then(function (responses) {
                        var parsedToken = parseToken(responses[0]);

                        if (!parsedToken) {
                            notifier.error('Can\'t parse EPAM\'s access token.');
                            $state.go('login');

                            return;
                        }

                        loginService.createSession(parsedToken.aud.user, responses[0].accessToken,
                            responses[1].accessToken)
                            .then(function () {
                                $rootScope.$broadcast('login:success');
                                $state.go('home');
                            }, function () {
                                $state.go('login');
                            });
                    }, function () {
                        notifier.error('Bad credentials.');
                        $state.go('login');
                    });
            }, function () {
                $state.go('login');
            });
        } else {
            notifier.error('There is no access code in response from EPAM SSO.');
            $state.go('login');
        }
    });
