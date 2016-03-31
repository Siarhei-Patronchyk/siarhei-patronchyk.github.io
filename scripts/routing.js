'use strict';

angular.module('appsngen.portal.routing', [
    'ui.router'
])
    .run(
        ['$rootScope', '$state',
        function ($rootScope,   $state) {
            $rootScope.$state = $state;
            }
        ]
    )
    .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
        var i;
        var states = [
            {
                title: 'Login',
                name: 'login',
                url: '/login?accountActivated',
                reloadOnSearch: false,
                controller: 'LoginCtrl',
                templateUrl: 'views/auth/login.html'
            },
            {
                title: 'Login EPAM SSO',
                name: 'loginEpamSSOCallback',
                url: '/login/epam-sso/auth?code&error&error_description',
                controller: 'LoginEpamSSOCallbackCtrl',
                templateUrl: 'views/auth/loginepamssocallback.html'
            },
            {
                title: 'Logout',
                name: 'logout',
                url: '/logout',
                controller: 'LogoutCtrl'
            },
            {
                title: 'Home',
                name: 'home',
                url: '/',
                onEnter: ['$state', function($state) {
                    $state.go('sandbox.widgets', {}, {location: 'replace'});
                }]
            },
            {
                title: 'Create Application',
                name: 'createApplication',
                url: '/create-application',
                controller: 'CreateApplicationCtrl',
                templateUrl: 'views/application/create-application.html'
            },
            {
                title: 'Under Construction',
                name: 'underConstruction',
                url: '/under-construction',
                templateUrl: 'views/underconstruction/underconstruction.html'
            },
            {
                title: 'Sandbox',
                name: 'sandbox',
                abstract: true,
                url: '/sandbox',
                templateUrl: 'views/common/navigation.html',
                controller: 'SandboxCtrl'
            },
            {
                title: 'Sandbox',
                name: 'sandbox.widgets',
                url: '/widgets',
                templateUrl: 'views/sandbox/widget/sandboxwidget.html',
                controller: 'SandboxWidgetsCtrl'
            },
            {
                title: 'Sandbox',
                name: 'sandbox.datasources',
                url: '/data-sources',
                templateUrl: 'views/sandbox/datasource/sandboxdatasource.html',
                controller: 'SandboxDataSourceCtrl'
            },
            {
                title: 'Sandbox',
                name: 'sandbox.applications',
                url: '/applications',
                templateUrl: 'views/sandbox/application/sandboxapplication.html',
                controller: 'SandboxApplicationCtrl'
            },
            {
                title: 'Sandbox',
                name: 'sandbox.dashboards',
                url: '/dashboards',
                templateUrl: 'views/sandbox/dashboard/sandboxdashboard.html',
                controller: 'SandboxDashboardCtrl'
            },
            {
                title: 'Subscriptions',
                name: 'subscriptions',
                abstract: true,
                url: '/subscriptions',
                templateUrl:'views/common/navigation.html',
                controller: 'SubscriptionsCtrl'
            },
            {
                title: 'Subscriptions',
                name: 'subscriptions.widgets',
                url: '/widgets',
                templateUrl: 'views/subscriptions/widgets/subscriptionswidgets.html',
                controller: 'SubscriptionsWidgetsCtrl'
            },
            {
                title: 'Subscriptions',
                name: 'subscriptions.datasources',
                url: '/data-sources',
                templateUrl: 'views/subscriptions/datasources/subscriptionsdatasources.html',
                controller: 'SubscriptionsDataSourceCtrl'
            },
            {
                title: 'Account Settings',
                name: 'accountSettings',
                url: '/account-settings',
                templateUrl: 'views/accountsettings/accountsettings.html',
                controller: 'AccountCtrl'
            }
        ];

        for (i = states.length - 1; i >= 0; i--) {
            $stateProvider.state(states[i]);
        }

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            $state.go('underConstruction', {}, {location: 'replace'});
        });

        $locationProvider.html5Mode(true);
    });
