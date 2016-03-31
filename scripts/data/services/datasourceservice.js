'use strict';

angular.module('appsngen.portal.data.services')
.factory('dataSourceService', function(Restangular, authSession, CONFIG) {
    var dataSourceRestService = Restangular.one('data-sources');
    var searchRestService = Restangular.one('search');

    var DS_PROXY_MANAGEMENT_URL = CONFIG.dataSourceProxyEndpoint + '/data-sources-management';
    var dataSourceProxy = Restangular.allUrl('dataSourceProxy.dsmanagement', DS_PROXY_MANAGEMENT_URL);

    var STATIC_DS_PROXY_MANAGEMENT_URL = CONFIG.dataSourceProxyEndpoint + '/static/data-sources-management';
    var staticDataSourceProxy = Restangular.allUrl('dataSourceProxy.static', STATIC_DS_PROXY_MANAGEMENT_URL);

    return {
        getDataSources: function(dataSourceParams) {
            dataSourceParams = dataSourceParams || {};

            var data = {
                sort: dataSourceParams.sort,
                order: dataSourceParams.order,
                offset: dataSourceParams.offset,
                max: dataSourceParams.max,
                category: dataSourceParams.category
            };

            if (dataSourceParams.search) {
                var url = 'data-sources/published';
                data.search = dataSourceParams.search;
                return searchRestService.one(url).get(data);
            } else {
                data.view = 'market';
                data.organizationId = dataSourceParams.organization;
                return dataSourceRestService.get(data);
            }
        },

        getAdminDataSources: function(dataSourceParams) {
            dataSourceParams = $.extend(dataSourceParams, {view: 'admin'});
            return dataSourceRestService.get(dataSourceParams);
        },

        getSandboxDataSources: function(dataSourceParams) {
            return dataSourceRestService.get({
                view: 'sandbox',
                organizationId: authSession.getOrganizationId(),
                offset: dataSourceParams.offset,
                max: dataSourceParams.max,
                sort: dataSourceParams.sort,
                order: dataSourceParams.order
            });
        },

        getDataSourcePreview: function(datasourceId) {
            return dataSourceRestService.one(datasourceId).get({
                view:'details',
                organizationId: authSession.getOrganizationId()
            });
        },

        deleteDataSource: function(datasourceId) {
            return dataSourceProxy.one(datasourceId).remove();
        },

        uploadDataSource: function(datasourceContent) {
            return dataSourceProxy
                .withHttpConfig({transformRequest: []})
                .customPOST(datasourceContent, '', {}, {
                    'Content-Type': 'application/octet-stream'
                });
        },

        getDataSourceResponseExamples: function (datasourceId) {
            return staticDataSourceProxy.one(datasourceId + '/examples').get();
        },

        submitForReview: function(dataSourceId) {
            return dataSourceRestService.one(dataSourceId).put({action: 'submit'});
        },

        putUnderReview: function(dataSourceId) {
            return dataSourceRestService.one(dataSourceId).put({action: 'review'});
        },

        recallReview: function(dataSourceId) {
            return dataSourceRestService.one(dataSourceId).put({action: 'recall'});
        },

        publishDataSource: function(dataSourceId) {
            return dataSourceRestService.one(dataSourceId).put({action: 'publish'});
        },

        rejectDataSource: function(dataSourceId, comment) {
            return dataSourceRestService.one(dataSourceId).customPUT({comment: comment}, '', {action: 'reject'});
        },

        retireDataSource: function(dataSourceId) {
            return dataSourceRestService.one(dataSourceId).one('retired').put();
        },

        getDataSourceThumbnailURL: function(dataSourceId) {
            return CONFIG.dataSourceProxyEndpoint + '/static/data-sources-management/' + dataSourceId + '/logo';
        },

        getDataSourceArchiveURL: function(dataSourceId) {
            return DS_PROXY_MANAGEMENT_URL + '/' + dataSourceId +
                '?accessToken=' + encodeURIComponent(authSession.getIdentityToken());
        }
    };
});
