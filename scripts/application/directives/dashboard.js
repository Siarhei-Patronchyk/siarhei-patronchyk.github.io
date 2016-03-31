'use strict';

angular.module('appsngen.portal.common.directives')

    .directive('dashboard', function($timeout) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'views/common/dashboard.html',
            scope: {
                name: '@',
                widgetList: '@',
                type: '@',
                index: '@',
                id: '@'
            },
            link: function($scope, $element) {
                var $widgetListWrapper = $element.find('.widget-list-wrapper'),
                    $widgetDescription = $element.find('.description'),
                    $showWidgetList = $element.find('.show-widget-list'),
                    $hideWidgetList = $element.find('.hide-widget-list'),
                    $widgetList = $widgetListWrapper.find('.widget-list');

                $timeout(function () {
                    $scope.showMore = false;
                    if($widgetListWrapper[0].offsetHeight < $widgetList[0].offsetHeight) {
                        $scope.showMore = true;

                        $showWidgetList.click(function () {
                            $widgetDescription.addClass('all-list');
                        });

                        $hideWidgetList.click(function () {
                            $widgetDescription.removeClass('all-list');
                        });
                    }
                });
            }
        };
    });
