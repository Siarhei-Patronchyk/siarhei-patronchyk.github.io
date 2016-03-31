'use strict';

angular.module('appsngen.portal.common.directives')

    .directive('searchInput', function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'views/common/searchinput.html',
            scope: {
                placeholder: '@'
            },
            link: function($scope, $element) {
                var $searchInputWrapper = $element.find('.search-input-wrapper'),
                    $searchInput = $searchInputWrapper.find('input'),
                    $searchIcon = $searchInputWrapper.find('.search-icon'),
                    $clearIcon = $searchInputWrapper.find('.clear-icon'),
                    $searchPlaceholder = $searchInputWrapper.find('p'),
                    $controlIcons = $searchInputWrapper.find('i'),
                    isOpen = false,
                    controlIconsClick = false;

                var openSearch = function () {
                    if (!isOpen) {
                        $element.addClass('search-input-is-active');
                        isOpen = true;
                    }
                    $searchInput.focus();
                };

                var closeSearch = function () {
                    if (isOpen) {
                        $element.removeClass('search-input-is-active');
                        $clearIcon.removeClass('active');
                        $searchInput.val('');
                        isOpen = false;
                    }
                };

                $searchIcon.click(openSearch);
                $searchPlaceholder.click(openSearch);

                $searchInput.on('focusout', function () {
                    if(!controlIconsClick) {
                        closeSearch();
                    }
                });

                $searchInput.on('input', function(e) {
                    if(e.target.value) {
                        $clearIcon.addClass('active');
                    } else {
                        $clearIcon.removeClass('active');
                    }
                });

                $clearIcon.click(function () {
                    $searchInput.val('');
                    $clearIcon.removeClass('active');
                    $searchInput.focus();
                });

                $controlIcons.mouseenter(function () {
                    controlIconsClick = true;
                });

                $controlIcons.mouseleave(function () {
                    controlIconsClick = false;
                });
            }
        };
    });
