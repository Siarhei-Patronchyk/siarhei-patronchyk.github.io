'use strict';

angular.module('appsngen.portal.common.directives')

    .directive('notification', function ($rootScope, $timeout) {
        var timer;
        var timeout = {
            success: 1500,
            error: 5000,
            warning: 4000,
            info: 5000
        };

        var fadeOutNotification = function (scope, element) {
            element.stop(true).fadeOut(500, function () {
                scope.$apply(function () {
                    scope.hideNotification = true;
                });
            });
        };

        var proccessNotification = function (scope, element, type, message, header) {
            scope.hideNotification = false;
            scope.notificationClass = 'notification-' + type;
            scope.message = message;
            scope.header = header;

            element.show();
            $timeout.cancel(timer);
            timer = $timeout(function () {
                fadeOutNotification(scope, element);
            }, timeout[type]);
        };

        return {
            restrict: 'E',
            scope: true,
            replace: true,
            templateUrl: 'views/common/notification.html',
            link: function ($scope, element) {
                $scope.hideNotification = true;
                $rootScope.$on('notifier:newNotification', function (event, data) {
                    proccessNotification($scope, element, data.type, data.message, data.header);
                });

                $scope.onClose = function () {
                    $scope.hideNotification = true;
                    $timeout.cancel(timer);
                };
            }
        };
    });
