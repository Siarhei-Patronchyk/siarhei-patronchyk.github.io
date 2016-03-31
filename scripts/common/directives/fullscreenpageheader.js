'use strict';

angular.module('appsngen.portal.common.directives')

.directive('fullScreenPageHeader', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'views/common/fullscreenpageheader.html',
        link: function (scope) {
            scope.switchCallback = function () {

            };

            scope.toggleLayoutCallback = function () {

            };
        }
    };
});
