'use strict';

angular.module('appsngen.portal.sandbox.dashboard.controllers')

.controller('SandboxDashboardCtrl', function($scope, $location, authSession, dashboardService, //jshint ignore: line
 notifier, PagingModel) {

    var sortParamKey = 'sort';
    var paging = new PagingModel(dashboardService.getSandboxDashboards);

    $scope.dashboards = [];
    $scope.loadingDashboards = true;

    $scope.uploadAction = {
        name: 'New Dashboard',
        icon: 'upload-dashboard-icon'
    };

    var loadPortion = function(){
        $scope.loadingDashboards = true;
        paging.load().then(function(response) {
            response.forEach(function(list) {
                list.devices = list.devices.join('-').toString().toLowerCase();
            });
            $scope.dashboards = $scope.dashboards.concat(response);
            $scope.hasMore = paging.hasMore();
        }).finally(function() {
            $scope.loadingDashboards = false;
        });
    };

    $scope.loadMore = loadPortion;

    var loadDashboards = function() {
        var sortParameter = $location.search()[sortParamKey] || 'name';

        paging.setSort(sortParameter);
        if (sortParameter === 'uploadDate') {
            paging.setOrder('DESC');
        } else {
            paging.setOrder('ASC');
        }

        loadPortion();
    };

    loadDashboards();
});
