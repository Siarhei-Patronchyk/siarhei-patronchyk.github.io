'use strict';

angular.module('appsngen.portal.application.controllers')

    .controller('CreateApplicationCtrl', function($scope) {
        $scope.selectedDevices = [];

        $scope.devices = {
            IPAD: 'iPad',
            IPHONE: 'iPhone',
            DESKTOP: 'desktop'
        };

        $scope.dashboards = [
            {
                name: 'my dashboard 1',
                widgets: [
                    'top news', 'portfolio',
                    'top news', 'portfolio',
                    'top news', 'portfolio',
                    'top news', 'portfolio'
                ],
                type: 'desktop',
                id: '0'
            },
            {
                name: 'my dashboard 2',
                widgets: ['top news', 'portfolio'],
                type: 'iphone',
                id: '1'
            },
            {
                name: 'my dashboard 1',
                widgets: [
                    'top news', 'portfolio',
                    'top news', 'portfolio',
                    'top news', 'portfolio',
                    'top news', 'portfolio'
                ],
                type: 'desktop',
                id: '2'
            },
            {
                name: 'my dashboard 2',
                widgets: ['top news', 'portfolio'],
                type: 'ipad',
                id: '3'
            },
            {
                name: 'my dashboard 1',
                widgets: [
                    'top news', 'portfolio',
                    'top news', 'portfolio',
                    'top news', 'portfolio',
                    'top news', 'portfolio'
                ],
                type: 'desktop-ipad-iphone',
                id: '4'
            },
            {
                name: 'my dashboard 2',
                widgets: ['top news', 'portfolio'],
                type: 'ipad',
                id: '5'
            },
            {
                name: 'my dashboard 1',
                widgets: [
                    'top news', 'portfolio',
                    'top news', 'portfolio',
                    'top news', 'portfolio',
                    'top news', 'portfolio'
                ],
                type: 'ipad-iphone',
                id: '6'
            },
            {
                name: 'my dashboard 2',
                widgets: ['top news', 'portfolio'],
                type: 'desktop',
                id: '7'
            },
            {
                name: 'my dashboard 1',
                widgets: [
                    'top news', 'portfolio',
                    'top news', 'portfolio',
                    'top news', 'portfolio',
                    'top news', 'portfolio'
                ],
                type: 'desktop',
                id: '8'
            },
            {
                name: 'my dashboard 2',
                widgets: ['top news', 'portfolio'],
                type: 'desktop-ipad',
                id: '9'
            },
            {
                name: 'my dashboard 1',
                widgets: [
                    'top news', 'portfolio',
                    'top news', 'portfolio',
                    'top news', 'portfolio',
                    'top news', 'portfolio'
                ],
                type: 'desktop-ipad',
                id: '10'
            },
            {
                name: 'my dashboard 2',
                widgets: ['top news', 'portfolio'],
                type: 'ipad',
                id: '11'
            }
        ];

        var onDropDashboardEventListener = function (event) {
            var $relatedTarget = $(event.relatedTarget).parent();
            var $target = $(event.target);
            var id = $relatedTarget.attr('id');
            var elem, x, y, index;

            x = $relatedTarget.offset().left - $target.offset().left;
            y = $relatedTarget.offset().top - $target.offset().top;

            x = x > 0 ? x : 0;
            y = y > 0 ? y : 0;

            $scope.$apply(function () {
                for (var i = 0; i < $scope.dashboards.length; i++) {
                    if ($scope.dashboards[i].id === id) {
                        index = i;
                        break;
                    }
                }
                $scope.dashboards[index].droped = 'true';
            });

            elem = $target.find('#' + id + ' .dashboard');
            elem.css('transform', 'translate(' + x + 'px, ' + y + 'px)');
            elem.attr('data-x', x);
            elem.attr('data-y', y);
        };

        $scope.draggableListInitObject = {
            target: '.drag-label',
            restrict: {
                restriction: '.droppable-area'
            }
        };

        $scope.draggableFildInitObject = {
            target: '.used-item',
            restrict: {
                restriction: '.full-screen-page-view'
            }
        };

        $scope.droppableInitObject = {
            ondrop: onDropDashboardEventListener
        };
    });
