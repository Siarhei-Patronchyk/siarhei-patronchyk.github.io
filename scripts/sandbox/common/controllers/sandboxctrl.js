'use strict';

angular.module('appsngen.portal.sandbox.common.controllers')

.controller('SandboxCtrl', function($scope, $state) {
        $scope.navigationStates = [
            {name: 'Widgets', state: 'sandbox.widgets'},
            {name: 'Data Sources', state: 'sandbox.datasources'},
            {name: 'Dashboards', state: 'sandbox.dashboards'},
            {name: 'Applications', state: 'sandbox.applications'}
        ];

        $scope.title = 'Sandbox';

        $scope.goToState = function (stateName) {
            $state.go(stateName);
        };
});
