'use strict';

angular.module('appsngen.portal.common.directives')

    .directive('deviceSwitcher', function (notifier) {
        return {
            restrict: 'E',
            templateUrl: 'views/common/deviceswitcher.html',
            scope: {
                switchCallback: '=switchCallback',
                toggleLayoutCallback: '=toggleLayoutCallback',
                layouts: '=layouts'
            },
            link: function (scope, element) {
                if (scope.layouts && scope.layouts.length) {
                    var $container = element.find('.device-switcher'),
                        $menu = element.find('ul.menu'),
                        $menuElements = $menu.find('li'),
                        $wrapper = $container.find('.devices-wrapper'),
                        $devicesList = $wrapper.find('label'),
                        chosenLayouts = scope.layouts;

                    var chooseFirstLayoutByDefault = function () {
                        var firstLayout, $checkbox;
                        if (_.indexOf(chosenLayouts, 'desktop') !== -1) {
                            firstLayout = $wrapper.find('label[layout="desktop"]');
                        } else if (_.indexOf(chosenLayouts, 'tablet') !== -1) {
                            firstLayout = $wrapper.find('label[layout="tablet"]');
                        } else {
                            firstLayout = $wrapper.find('label[layout="mobile"]');
                        }

                        $checkbox = firstLayout.find('input');
                        $checkbox.prop('checked', true);
                        scope.switchCallback(firstLayout.attr('layout'));
                    };

                    var showNecessaryDevice = function (targetDevice) {
                        var $targetDeviceElement;
                        if (targetDevice) {
                            $targetDeviceElement = $wrapper.find('label[layout="' + targetDevice + '"]');
                            $targetDeviceElement.addClass('active-layout');
                        } else {
                            _.each($devicesList, function (device) {
                                var $device = $(device),
                                    deviceLayout = $device.attr('layout');

                                _.each(chosenLayouts, function (layout) {
                                    if (deviceLayout === layout) {
                                        $device.addClass('active-layout');
                                    }
                                });
                            });
                        }
                    };

                    var hideNecessaryDevice = function (targetDevice) {
                        var $targetDeviceElement = $wrapper.find('label[layout="' + targetDevice + '"]');
                        $targetDeviceElement.removeClass('active-layout');
                        $targetDeviceElement.find('input').prop('checked', false);
                    };

                    var checkNecessaryDevice = function () {
                        _.each($menuElements, function (element) {
                            var $element = $(element),
                                elementLayout = $element.attr('layout');

                            _.each(chosenLayouts, function (layout) {
                                if (elementLayout === layout) {
                                    $element.find('input').prop('checked', true);
                                }
                            });
                        });
                    };

                    $container.on('change', 'input[type="radio"]', function (e) {
                        scope.$apply(function () {
                            var $target = $(e.target);
                            if ($target.prop('checked')) {
                                scope.switchCallback(e.target.id);
                            }
                        });
                    });

                    $menu.on('click', 'input[type="checkbox"]', function (e) {
                        scope.$apply(function () {
                            var $target = $(e.target),
                                isChecked = $target.prop('checked'),
                                mode = $target.attr('mode'),
                                isCurrentLayout = $wrapper.find('label[layout="' + mode +
                                    '"]').find('input').prop('checked');

                            if (isChecked) {
                                chosenLayouts.push(mode);
                                showNecessaryDevice(mode);
                                scope.toggleLayoutCallback(chosenLayouts, true);
                            } else if (chosenLayouts.length !== 1) {
                                _.pull(chosenLayouts, mode);
                                if (isCurrentLayout) {
                                    chooseFirstLayoutByDefault();
                                }
                                hideNecessaryDevice(mode);
                                scope.toggleLayoutCallback(chosenLayouts, false);
                            } else {
                                $target.prop('checked', true);
                                notifier.error({
                                    message: 'At least one device must be selected.'
                                });
                            }
                        });
                    });

                    showNecessaryDevice();
                    chooseFirstLayoutByDefault();
                    checkNecessaryDevice();
                } else {
                    throw(new TypeError('Layouts array is empty or undefined'));
                }
            }
        };
    });
