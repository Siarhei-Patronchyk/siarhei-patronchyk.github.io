'use strict';

angular.module('appsngen.portal.subscriptions.common.controllers')

.controller('SubscriptionsCtrl', function($scope, $state) {
        $scope.navigationStates = [
            {name: 'Widgets', state: 'subscriptions.widgets'},
            {name: 'Data Sources', state: 'subscriptions.datasources'}
        ];

        $scope.title = 'Subscriptions';

        $scope.goToState = function (stateName) {
            $state.go(stateName);
        };
});
