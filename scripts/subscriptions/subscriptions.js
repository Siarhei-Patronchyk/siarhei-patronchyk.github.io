'use strict';

angular.module('appsngen.portal.subscriptions.widget', []);

angular.module('appsngen.portal.subscriptions.datasource', []);

angular.module('appsngen.portal.subscriptions.common', []);

angular.module('appsngen.portal.subscriptions', [
    'appsngen.portal.subscriptions.widget',
    'appsngen.portal.subscriptions.datasource',
    'appsngen.portal.subscriptions.common'
]);
