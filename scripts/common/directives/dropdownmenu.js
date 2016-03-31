'use strict';

angular.module('appsngen.portal.common.directives')

.directive('dropdownMenu', function() {
    return {
        restrict: 'E',
        scope: {
            items: '='
        },
        templateUrl: 'views/common/dropdown-menu.html'
    };
});
