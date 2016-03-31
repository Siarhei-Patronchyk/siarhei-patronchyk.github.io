'use strict';

angular.module('appsngen.portal.common.directives')

.directive('underConstructionPage', function() {
    return {
        restrict: 'A',
        link: function(scope) {
            var body = $('body');

            body.addClass('under-construction-page');

            scope.$on('$destroy', function() {
                body.removeClass('under-construction-page');
            });
        }
    };
});
