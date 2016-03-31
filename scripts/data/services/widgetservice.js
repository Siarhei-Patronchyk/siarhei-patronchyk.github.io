'use strict';

angular.module('appsngen.portal.data.services')

.factory('widgetService', function(Restangular, authSession, CONFIG) {
    var gadgetManagementRestService = Restangular.one('gadget-management');
    var widgetsRestService = Restangular.one('widgets');
    var searchRestService = Restangular.one('search');

    var VIEWER_WIDGETS_URL = CONFIG.viewerEndpoint + '/widgets';
    var widgetsViewer = Restangular.allUrl('viewer.widgets', VIEWER_WIDGETS_URL);

    return {

        getWidgets: function(widgetParams) {
            widgetParams = widgetParams || {};

            var data = {
                offset: widgetParams.offset,
                max: widgetParams.max,
                sort: widgetParams.sort,
                order: widgetParams.order,
                platform: widgetParams.platform,
                category: widgetParams.category
            };

            var url = 'apps/';

            if (!authSession.isSalesUser()) {
                data.visibilities = 'public,default,private';
            }

            if (widgetParams.search) {
                url += 'published';
                data.organizationId = authSession.getOrganizationId();
                data.search = widgetParams.search;
                return searchRestService.one(url).get(data);
            } else {
                url += 'market';
                data.clientId = authSession.getOrganizationId();
                data.organizationId = widgetParams.organization;

                return gadgetManagementRestService.one(url).get(data);
            }
        },

        getSandboxWidgets: function(widgetParams) {
            var url = '/apps/dev';

            widgetParams = widgetParams || {};
            return gadgetManagementRestService.one(url).get({
                offset: widgetParams.offset,
                max: widgetParams.max,
                sort: widgetParams.sort,
                order: widgetParams.order
            });
        },

        getAdminWidgets: function(widgetParams) {
            return gadgetManagementRestService.one('apps').get(widgetParams);
        },

        getSubscribedWidgetsForDashboard: function(platform) {
            return gadgetManagementRestService
                .one(authSession.getOrganizationId()).one('apps/subscribed')
                .get({view: 'dashboard', platform: platform});
        },

        getWidgetPreview: function(widgetId) {
            var data = {
                view: 'details',
                organizationId: authSession.getOrganizationId()
            };

            if (authSession.isSalesUser()) {
                data.allowPrivate = true;
            }

            return widgetsRestService.one(widgetId).get(data);
        },

        getWidgetConfig: function(widgetId) {
            var data = {
                view: 'config',
                organizationId: authSession.getOrganizationId(),
            };

            if (authSession.isSalesUser()) {
                data.allowPrivate = true;
            }

            return widgetsRestService.one(widgetId).get(data);
        },

        submitForReview: function(widgetId) {
            var url = widgetId + '/submitted';
            return widgetsRestService.one(url).put({organizationId: authSession.getOrganizationId()});
        },

        recallReview: function(widgetId) {
            var url = widgetId + '/recalled';
            return widgetsRestService.one(url).put({organizationId: authSession.getOrganizationId()});
        },

        retireWidget: function(widgetId) {
            var url = widgetId + '/retired';
            return widgetsRestService.one(url).put({organizationId: authSession.getOrganizationId()});
        },

        rejectWidget: function(params) {
            var url = params.id + '/rejected',
                reject = widgetsRestService.one(url);
            reject.comment = params.comment;
            return reject.put({organizationId: authSession.getOrganizationId()});
        },

        publishWidget: function(widgetId) {
            var url = widgetId + '/published';
            return widgetsRestService.one(url).put({organizationId: authSession.getOrganizationId()});
        },

        putUnderReview: function(widgetId) {
            var url = widgetId + '/reviewed';
            return widgetsRestService.one(url).put({organizationId: authSession.getOrganizationId()});
        },

        deleteWidget: function(widgetId) {
            return widgetsViewer.one(widgetId).remove();
        },

        uploadWidget: function(widgetContent) {
            return widgetsViewer
                .withHttpConfig({transformRequest: []})
                .customPOST(widgetContent, '', {}, {
                    'Content-Type': 'application/octet-stream'
                });
        },

        updateWidget: function(widgetContent) {
            return widgetsViewer
                .withHttpConfig({transformRequest: []})
                .customPUT(widgetContent, '', {}, {
                    'Content-Type': 'application/octet-stream'
                });
        },

        getWidgetThumbnailURL: function(widget) {
            return CONFIG.viewerEndpoint + widget.thumbnail;
        },

        getWidgetArchiveURL: function(widgetId) {
            return VIEWER_WIDGETS_URL + '/' + widgetId +'?token=' + encodeURIComponent(authSession.getIdentityToken());
        },

        getWidgetURL: function(widgetId, parent, accessToken) {
            return CONFIG.viewerEndpoint + '/content/widgets/' + widgetId + '/index.html?parent=' +
                encodeURIComponent(parent) + '&token=' + encodeURIComponent(accessToken);
        }
    };
});
