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
    $rootScope.oneAlert('Sesión Cerrada', 'info');
    store.remove('token');
    store.remove('me');
    $state.go('entrar');
});
