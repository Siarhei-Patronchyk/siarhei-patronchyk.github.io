'use strict';

angular.module('appsngen.portal', [
        'restangular',
        'base64',
        'LocalStorageModule',
        'ngDialog',

    'appsngen.portal.routing',
    'appsngen.portal.common',
    'appsngen.portal.application',
    'appsngen.portal.auth',
    'appsngen.portal.data',
    'appsngen.portal.accountsettings',
    'ui.bootstrap.dropdown',
    'ui.bootstrap.position',
    'appsngen.portal.sandbox',
    'appsngen.portal.subscriptions'

    ])
    .constant('ERRORS', {
        APPSNGEN_API_ERROR: 'Unable to load AppsNgen API',
        DASHBOARD_API_ERROR: 'Unable to load Dashboard API'
    })
    .config(function (RestangularProvider, CONFIG) {
        RestangularProvider.setBaseUrl(CONFIG.restServicesEndpoint);
    })
    .run(function ($rootScope, $state, Restangular, CONFIG, authSession, $window, notifier) {//jshint ignore: line
        var tokensEndpoint = CONFIG.restServicesEndpoint + '/tokens';

        var publicStates = [
            'login',
            'logout'
        ];

        $rootScope.marketingEndpoint = CONFIG.marketingEndpoint;

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            if (!authSession.isAuthenticated() && publicStates.indexOf(toState.name) === -1) {
                $rootScope.loginStateName = toState.name;
                $state.go('login', {}, {location: 'replace'});
                event.preventDefault();
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            $rootScope.title = toState.title;
        });

        Restangular.setFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {// jshint ignore:line
            if (url.indexOf(tokensEndpoint) !== 0) {

                var accessToken;

                if (url.indexOf(CONFIG.viewerEndpoint) === 0 || url.indexOf(CONFIG.dataSourceProxyEndpoint) === 0) {
                    accessToken = authSession.getIdentityToken();
                } else {
                    accessToken = authSession.getAccessToken();
                }

                headers.Authorization = 'Bearer ' + accessToken;
            }

            return {
                element: element,
                params: params,
                headers: headers,
                httpConfig: httpConfig
            };
        });

        Restangular.setErrorInterceptor(function (response) {
            var errorMessage = response.data.message;

            if (errorMessage) {
                notifier.error(errorMessage);
            }

            return true;
        });

        $window.ga('set', 'dimension1', authSession.getUsername() || 'anonymous');
        $window.ga('send', 'pageview');
    });
