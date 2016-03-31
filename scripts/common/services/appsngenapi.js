'use strict';

angular.module('appsngen.portal.common.services')

.factory('appsngenApi', function(CONFIG) {
    var loadApiTask;

    return {
        ensureApiLoaded: function() {
            var script;

            if (loadApiTask) {
                return loadApiTask.promise();
            }

            loadApiTask = new $.Deferred();
            script = document.createElement('script');

            script.src = CONFIG.viewerEndpoint + '/content/js/appsngen.container.api.js';
            script.onload = function () {
                if (window.appsngen) {
                    loadApiTask.resolve(window.appsngen);
                } else {
                    console.error('appsngen.api loaded but no appsngen namespace found');
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
