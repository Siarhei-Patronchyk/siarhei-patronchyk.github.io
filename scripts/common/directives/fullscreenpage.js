'use strict';

angular.module('appsngen.portal.common.directives')

.directive('fullScreenPage', function() {
    return {
        restrict: 'A',
        link: function(scope) {
            var $body = $('body');

            $body.addClass('full-screen-page');

            scope.$on('$destroy', function() {
                $body.removeClass('full-screen-page');
            });
        }
    };
});
