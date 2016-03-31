'use strict';

angular.module('appsngen.portal.subscriptions.datasource.controllers')

.controller('SubscriptionsDataSourceCtrl', function($scope, $location, authSession, dataSourceService, PagingModel) {

    var sortParamKey = 'sort';
    var paging = new PagingModel(dataSourceService.getSandboxDataSources);

    $scope.loadingDatasources = true;
    $scope.$location = $location;
    $scope.dataSources = [];

    $scope.uploadAction = {
        name: 'Upload Data Source',
        icon: 'upload-datasource-icon'
    };

    $scope.actionOptions = {
        items: [
            {
                name: 'Submit for review',
                icon: 'fa-long-arrow-right'
            },
            {
                name: 'Recall review',
                icon: 'fa-times-circle-o'
            },
            {
                name: 'Download',
                icon: 'fa-download'
            }
        ]
    };

    var loadPortion = function() {
        $scope.loadingDatasources = true;
        paging.load().then(function(response) {
            $scope.dataSources = $scope.dataSources.concat(response);
            $scope.hasMore = paging.hasMore();
        }).finally(function() {
            $scope.loadingDatasources = false;
        });
    };

    var loadDataSources = function() {
        var sortParameter = $location.search()[sortParamKey] || 'uploadDate';
        $scope.dataSources = [];
        paging.setSort(sortParameter);

        if (sortParameter === 'uploadDate') {
            paging.setOrder('DESC');
        } else {
            paging.setOrder('ASC');
        }

        loadPortion();
    };

    $scope.loadMore = loadPortion;

    $scope.getThumbnailURL = function(dataSource) {
        return dataSourceService.getDataSourceThumbnailURL(dataSource.id);
    };

    $scope.getDataSourceArchiveURL = function (dataSource) {
        return dataSourceService.getDataSourceArchiveURL(dataSource.id);
    };

    loadDataSources();
});
