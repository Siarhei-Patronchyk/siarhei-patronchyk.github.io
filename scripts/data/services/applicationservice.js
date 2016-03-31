'use strict';

angular.module('appsngen.portal.data.services')

.factory('applicationService', function($http, Restangular, authSession, CONFIG) {
    var applicationService = Restangular.one('mobile-applications');

    return {
        getSandboxApplications: function(applicationParams) {
            return applicationService.get({
                clientId: authSession.getOrganizationId(),
                offset: applicationParams.offset,
                max: applicationParams.max,
                sort: applicationParams.sort,
                order: applicationParams.order,
                devices: applicationParams.devices
            });
        },

        delete: function(applicationId) {
            return applicationService.one(applicationId).remove({
                clientId: authSession.getOrganizationId()
            });
        },

        create: function(application, logo) {
            var formData = new FormData();

            application.organizationId = authSession.getOrganizationId();
            formData.append('details', angular.toJson(application));

            if (logo) {
                formData.append('logo', logo);
            }
            return Restangular.one('mobile-applications')
                .withHttpConfig({transformRequest: angular.identity})
                .customPOST(formData, '', undefined, {'Content-Type': undefined});
        },

        update: function(application) {
            return applicationService.one(application.id)
                .customPUT(application, '', {
                    clientId: authSession.getOrganizationId()
                });
        },

        get: function(applicationId) {
            return applicationService.one(applicationId).get({clientId: authSession.getOrganizationId()});
        },

        uploadLogo: function(applicationId, logo) {
            var formData = new FormData();

            formData.append('logo', logo);

            return Restangular.one('mobile-applications').one(applicationId)
                .withHttpConfig({transformRequest: angular.identity})
                .customPOST(formData, 'file', {
                    clientId: authSession.getOrganizationId()
                }, {'Content-Type': undefined});
        },

        getApplicationThumbnailURL: function(application) {
            return CONFIG.restServicesEndpoint + '/mobile-applications/' + application.id + '/file?clientId=' +
                encodeURIComponent(authSession.getOrganizationId()) + '&accessToken=' + authSession.getAccessToken();
        }
    };
});
