'use strict';

angular.element(document).ready(function () {
    $.ajax({
        url: 'config.json',
        type: 'GET',
        success: function (response) {
            angular.module('appsngen.portal').constant('CONFIG', response);
            angular.bootstrap(document, ['appsngen.portal']);
        },
        error: function () {
            window.location.href = '/error.html';
        }
    });
});
