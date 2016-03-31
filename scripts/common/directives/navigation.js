'use strict';

angular.module('appsngen.portal.common.directives')

.directive('navigation', function() {
    return {
        restrict: 'E',
        controller: 'NavigationCtrl',
        templateUrl: 'views/common/navigation.html'
    };
});
