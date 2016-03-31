'use strict';

angular.module('appsngen.portal.sandbox.application.controllers')

.controller('SandboxApplicationCtrl', function($scope, $location, authSession, applicationService, PagingModel) {

    var sortParamKey = 'sort';
    var paging = new PagingModel(applicationService.getSandboxApplications);

    $scope.loadingApplications = true;
    $scope.$location = $location;
    $scope.dataSources = [];

    $scope.uploadAction = {
        name: 'New Apllication',
        icon: 'upload-application-icon'
    };

    var loadPortion = function() {
        paging.load().then(function(response) {
            response.forEach(function(application) {
                application.thumbnail = applicationService.getApplicationThumbnailURL(application);
            });
            $scope.applications = $scope.applications.concat(response);
            $scope.hasMore = paging.hasMore();
        }).finally(function() {
            $scope.loadingApplications = false;
        });
    };

    var loadApplications = function() {
        $scope.applications = [];
        var sortParameter = $location.search()[sortParamKey] || 'name';
        paging.setSort(sortParameter);

        paging.setSort(sortParameter);

        if (sortParameter === 'uploadDate') {
            paging.setOrder('DESC');
        } else {
            paging.setOrder('ASC');
        }

        loadPortion();
    };

    $scope.getThumbnailURL = function(application) {
        if (application.thumbnail.message) {
            application.thumbnail = 'error';
        }
        return application.thumbnail;
    };

    $scope.loadMore = loadPortion;

    loadApplications();
});
