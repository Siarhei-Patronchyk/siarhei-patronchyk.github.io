'use strict';

angular.module('appsngen.portal.common.filters')

    .filter('join', function () {
        return function (input, separator) {

            return input.join(separator);
        };
    });
