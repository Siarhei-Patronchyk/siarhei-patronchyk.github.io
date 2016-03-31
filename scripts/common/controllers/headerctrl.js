'use strict';

angular.module('appsngen.portal.common.controllers')

.controller('HeaderCtrl', function($scope, authSession) {
    var setUserInfo = function() {
        $scope.username = authSession.getDisplayName();
        $scope.email = authSession.getUsername();
        $scope.organizationId = authSession.getOrganizationId();
        $scope.organizationName = authSession.getOrganizationDisplayName();
    };

    $scope.$on('login:success', function() {
        setUserInfo();
    });

    setUserInfo();
});
