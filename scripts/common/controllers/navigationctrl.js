'use strict';

angular.module('appsngen.portal.common.controllers')

.controller('NavigationCtrl', function($scope, $rootScope, $state) {
    $scope.navigation = {
        items: [
            {
                name: 'Sandbox',
                items: [
                    {name: 'Widgets', states: ['sandbox.widgets']},
                    {name: 'Dashboards', states: ['sandbox.dashboards']},
                    {name: 'Applications', states:['sandbox.applications']},
                    {name: 'Data Sources', states: ['sandbox.datasources']}
                ]
            },
            {
                name: 'Subscriptions',
                items: [
                    {name: 'Widgets', states: ['subscriptions.widgets']},
                    {name: 'Data Sources', states: ['subscriptions.datasources']},
                ]
            }
        ]
    };

    var setSelectedNavigationItems = function(currentState) {

        $scope.navigation.items.forEach(function(item1) {
            item1.selected = false;
            item1.items.forEach(function(item2){
                item2.states.forEach(function(state) {
                    if (state === currentState.name) {
                        item2.selected = true;
                        item1.selected = true;
                    }
                    else {
                        item2.selected = false;
                    }
                });
            });
        });
    };

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
        setSelectedNavigationItems(toState);
    });

        setSelectedNavigationItems($state.current);
});
