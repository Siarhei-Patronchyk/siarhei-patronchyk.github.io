'use strict';

angular.module('appsngen.portal.common.services')

.factory('dashboardApi', function(CONFIG) {
    var loadApiTask;

    return {
        ensureApiLoaded: function() {
            var script;

            if (loadApiTask) {
                return loadApiTask.promise();
            }

            loadApiTask = new $.Deferred();
            script = document.createElement('script');

            script.src = CONFIG.dashboardViewerEndpoint + '/js/dashboard.js';
            script.onload = function () {
                if (window.dashboardRenderer) {
                    loadApiTask.resolve(window.dashboardRenderer);
                } else {
                    console.error('dashboard.api loaded but no dashboardRenderer namespace found');
                    // allow to make one more attempt in case of failure
                    loadApiTask = null;
                }

            };
            script.onerror = function () {
                loadApiTask.reject();
                // allow to make one more attempt in case of failure
                loadApiTask = null;
            };

            document.body.appendChild(script);

            return loadApiTask.promise();
        }
    };
});
