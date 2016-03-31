'use strict';

angular.module('appsngen.portal.common.controllers')

.controller('TabsetCtrl', function($scope) {
    var ctrl = this,
        tabs = $scope.tabs = [];
    var destroyed;

    ctrl.select = function(selectedTab) {
        angular.forEach(tabs, function(tab) {
            if (tab.active && tab !== selectedTab) {
                tab.active = false;
                tab.onDeselect();
            }
        });
        selectedTab.active = true;
        selectedTab.onSelect();
    };

    ctrl.addTab = function(tab) {
        tabs.push(tab);
        if (tabs.length === 1 && tab.active !== false) {
            tab.active = true;
        } else if (tab.active) {
            ctrl.select(tab);
        } else {
            tab.active = false;
        }
    };

    ctrl.removeTab = function(tab) {
        var index = tabs.indexOf(tab);
        if (tab.active && tabs.length > 1 && !destroyed) {
            var newActiveIndex = index === tabs.length - 1 ? index - 1 : index + 1;
            ctrl.select(tabs[newActiveIndex]);
        }
        tabs.splice(index, 1);
    };

    ctrl.getTabByHeading = function(tabHeading) {
        return _.find(tabs, {heading: tabHeading});
    };

    $scope.$on('$destroy', function() {
        destroyed = true;
    });
});
