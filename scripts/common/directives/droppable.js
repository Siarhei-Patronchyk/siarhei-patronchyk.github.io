'use strict';

angular.module('appsngen.portal.common.directives')

    .directive('droppable', function($timeout) {

        var defaultParams = {
            overlap: 0.50
        };

        return {
            restrict: 'A',
            scope: {
                droppableInitObject: '='
            },
            link: function($scope, element) {
                if ($scope.droppableInitObject) {
                    $timeout(function () {
                        var initObject = $.extend(true, {}, defaultParams, $scope.droppableInitObject);
                        var $target = '#' + $(element).attr('id');

                        interact($target).dropzone(initObject);
                    });
                } else {
                    throw (new TypeError('Init object is not defined'));
                }
            }
        };
    });
