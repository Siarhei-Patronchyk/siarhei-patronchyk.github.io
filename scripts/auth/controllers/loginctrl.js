'use strict';

angular.module('appsngen.portal.auth.controllers')

    .controller('LoginCtrl', function ($scope, $rootScope, $location, $stateParams, $state, authService, authSession, loginService, $sce, CONFIG, $window) { // jshint ignore:line
        if (authSession.isAuthenticated()) {
            $state.go('home');
            return;
        }

        $scope.accountActivated = $stateParams.accountActivated;

        $scope.clientId = CONFIG.epamSSOClientId;
        $scope.redirectUri = $state.href('loginEpamSSOCallback', {}, {absolute: true});
        $scope.authUrl = $sce.trustAsResourceUrl(CONFIG.epamSSOAuthUrl);
        $scope.resource = CONFIG.epamSSOResource;
        $scope.marketingEndpoint = CONFIG.marketingEndpoint;

        if($scope.accountActivated === 'true') {
            $scope.state = 'accountActivated';
        } else {
            $scope.state = 'login';
        }

        $scope.goHome = $rootScope.previousStateName === 'signup' ||
            $rootScope.previousStateName === 'signupConfirmation' ||
            $rootScope.previousStateName === 'logout' ||
            $scope.state === 'accountActivated';

        $scope.user = {
            username: '',
            password: ''
        };

        $scope.closeHref = $scope.goHome ? $scope.marketingEndpoint : '';

        $scope.close = function () {
            if(!$scope.goHome) {
                if ($rootScope.previousStateName === '') {
                    $window.history.back();
                } else {
                    $state.go($rootScope.previousStateName, {}, {location: 'replace'});
                }
            }
        };

        $scope.login = function () {
            $scope.submitting = true;
            $scope.authError = false;
            $scope.stateName = $rootScope.loginStateName || 'home';

            authService.authenticate($scope.user)
                .then(function (responses) {
                    loginService.createSession($scope.user.username, responses[0].accessToken, responses[1].accessToken)
                        .then(function () {
                            $rootScope.$broadcast('login:success');
                            $state.go($scope.stateName);
                        })
                        .finally(function () {
                            $rootScope.loginStateName = '';
                            $scope.submiting = false;
                        });
                }, function () {
                    $location.search('accountActivated', 'false');
                    $scope.user.password = '';
                    $scope.submitting = false;
                    $scope.state = 'login';
                    $scope.authError = true;
                });
        };
    });
