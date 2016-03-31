'use strict';

angular.module('appsngen.portal.common.directives')

.directive('headerMenu', function() {
    return {
        restrict: 'E',
        controller: 'HeaderCtrl',
        templateUrl: 'views/common/header.html'
    };
});
