'use strict';

angular.module('appsngen.portal.data.services')

.factory('dashboardService', function(Restangular, authSession, CONFIG) {
    var restService = Restangular.one('dashboards');

    return {
        getDashboards: function(dashboardParams) {
            return restService.get({
                organizationId: authSession.getOrganizationId(),
                offset: dashboardParams.offset,
                max: dashboardParams.max,
                sort: dashboardParams.sort,
                order: dashboardParams.order,
                devices: dashboardParams.devices
            });
        },

        getSandboxDashboards: function(dashboardParams) {
            return restService.get({
                view: 'sandbox',
                organizationId: authSession.getOrganizationId(),
                offset: dashboardParams.offset,
                max: dashboardParams.max,
                order: dashboardParams.order
            });
        },

        getAllDashboards: function(devices) {
            return restService.get({
                organizationId: authSession.getOrganizationId(),
                devices: devices
            });
        },

        getDashboardPreview: function(dashboardId) {
            return restService.one(dashboardId).get({
                organizationId: authSession.getOrganizationId()
            });
        },

        deleteDashboard: function(dashboardId) {
            return restService.one(dashboardId).remove({organizationId: authSession.getOrganizationId()});
        },

        renameDashboard: function(dashboardId, dashboardName) {
            var request = restService.one(dashboardId);
            request.name = dashboardName;
            return request.put({organizationId: authSession.getOrganizationId()});
        },

        create: function(dashboardContent) {
            var service = Restangular.withConfig(function(RestangularConfigurer) {
                RestangularConfigurer.setFullResponse(true);
            }).one('dashboards');
            dashboardContent.organizationId = authSession.getOrganizationId();

            return service.customPOST(dashboardContent);
        },

        update: function(dashboardId, dashboard) {
            return restService.one(dashboardId)
                .customPUT(dashboard, '', {organizationId: authSession.getOrganizationId()});
        },

        getDashboardBookmark: function (dashboardId) {
            return CONFIG.dashboardViewerEndpoint + '/dashboards/' + dashboardId + '/bookmark';
        }
    };
});
