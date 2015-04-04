'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SalirCtrl
 * @description
 * # SalirCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
.controller('SalirCtrl', function ($rootScope, $scope, $state, store) {
    $rootScope.logged = false;
    store.remove('token');
    store.remove('me');
    $state.go('entrar');
});
