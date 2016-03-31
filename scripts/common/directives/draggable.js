'use strict';

angular.module('appsngen.portal.common.directives')

    .directive('draggable', function($timeout) {

        var dragMoveListener = function (event) {
            var target = $(event.target).parent();
            var x = (parseFloat(target.attr('data-x')) || 0) + event.dx,
                y = (parseFloat(target.attr('data-y')) || 0) + event.dy;

            target.css('transform', 'translate(' + x + 'px, ' + y + 'px)');
            target.attr('data-x', x);
            target.attr('data-y', y);
        };

        var onStartDashboardMoveEventListener = function (event) {
            var $element = $(event.target).parent();
            var width = $element.outerWidth();
            var height = $element.outerHeight();
            var $parentElement = $element.closest('.draggable-container');
            var sidebar = $element.closest('.sidebar-content');

            if (sidebar[0]) {
                var sidebarScrollOffset = - sidebar.scrollTop();
                $parentElement.css('min-height', height);
                $parentElement.css('min-width', width);
                $element.attr('data-y', sidebarScrollOffset);
            }

            $element.css('position', 'fixed');
        };

        var onEndDashboardMoveEventListener = function (event) {
            var $element = $(event.target).parent();

            $element.css('position', 'relative');

            if (!event.dropzone) {
                $element.css('transform', 'translate(0px, 0px)');
                $element.attr('data-x', '0');
                $element.attr('data-y', '0');
            }
        };

        var defaultParams = {
            restrict: {
                restriction: 'parent',
                endOnly: true,
                elementRect: {top: 0, left: 0, bottom: 1, right: 1}
            },
            onmove: dragMoveListener,
            onstart: onStartDashboardMoveEventListener,
            onend: onEndDashboardMoveEventListener
        };

        return {
            restrict: 'A',
            scope: {
                draggableInitObject: '='
            },
            link: function($scope, element) {
                if ($scope.draggableInitObject) {
                    $timeout(function () {
                        var initObject = $.extend(true, {}, defaultParams, $scope.draggableInitObject);
                        var $target = '#' + $(element).attr('id') + ' ' + initObject.target;

                        interact($target).draggable(initObject);
                    });
                } else {
                    throw (new TypeError('Init object is not defined'));
                }
            }
        };
    });
