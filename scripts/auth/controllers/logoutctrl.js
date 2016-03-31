'use strict';

angular.module('appsngen.portal.auth.controllers')

.controller('LogoutCtrl', function($state, authSession) {
    authSession.destroy();
    $state.go('login', {}, {location: 'replace'});
});
