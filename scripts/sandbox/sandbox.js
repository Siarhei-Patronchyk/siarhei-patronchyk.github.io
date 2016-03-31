'use strict';

angular.module('appsngen.portal.sandbox.widget', []);

angular.module('appsngen.portal.sandbox.datasource', []);

angular.module('appsngen.portal.sandbox.application', []);

angular.module('appsngen.portal.sandbox.dashboard', []);

angular.module('appsngen.portal.sandbox.common', []);

angular.module('appsngen.portal.sandbox', [
    'appsngen.portal.sandbox.widget',
    'appsngen.portal.sandbox.datasource',
    'appsngen.portal.sandbox.application',
    'appsngen.portal.sandbox.dashboard',
    'appsngen.portal.sandbox.common'
]);
