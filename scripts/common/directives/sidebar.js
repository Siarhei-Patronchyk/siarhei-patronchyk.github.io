'use strict';

angular.module('appsngen.portal.common.directives')

.directive('sidebar', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'views/common/sidebar.html',
        scope: {
            withoutSearch: '='
        },
        link: function($scope, $element) {
            var $toggleButton = $element.find('.chevron-icons');

            var toggleMenu = function () {
                var $elem = $('.sidebar');
                $elem.toggleClass('menu-close');
            };

            $toggleButton.click(toggleMenu);
        }
    };
});
