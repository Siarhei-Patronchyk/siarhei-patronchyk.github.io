'use strict';

angular.module('appsngen.portal.sandbox.widget.controllers')

.controller('SandboxWidgetsCtrl', function($scope, $location, authSession, widgetService, PagingModel) {

    var sortParamKey = 'sort';
    var paging = new PagingModel(widgetService.getSandboxWidgets);

    $scope.loadingWidgets = true;
    $scope.$location = $location;
    $scope.widgets = [];

    $scope.uploadAction = {
        name: 'Upload Widget',
        icon: 'upload-widget-icon'
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
        $scope.loadingWidgets = true;
        paging.load().then(function(response) {
            $scope.widgets = $scope.widgets.concat(response);
            $scope.hasMore = paging.hasMore();
        }).finally(function() {
            $scope.loadingWidgets = false;
        });
    };

    var loadWidgets = function() {
        var sortParameter = $location.search()[sortParamKey] || 'uploadDate';
        $scope.widgets = [];
        paging.setSort(sortParameter);

        if (sortParameter === 'uploadDate') {
            paging.setOrder('DESC');
        } else {
            paging.setOrder('ASC');
        }

        loadPortion();
    };

    $scope.loadMoreWidgets = loadPortion;

    $scope.getThumbnailURL = function(widget) {
        return widgetService.getWidgetThumbnailURL(widget);
    };

    $scope.getWidgetArchiveURL = function(widget) {
        return widgetService.getWidgetArchiveURL(widget.urn);
    };

    loadWidgets();
});
