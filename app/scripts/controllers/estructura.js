'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:EstructuraCtrl
 * @description
 * # EstructuraCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
.controller('EstructuraCtrl', function ($rootScope, $scope, $location, $stateParams, store, apiFactory) {
    var nivel = (+$stateParams.nivelId)?+$stateParams.nivelId+1:undefined;
    var estructura = $stateParams.estructuraId;
    var tipo = $stateParams.tipo;
    var usuario = store.get('me');

    if ((+usuario.nivel+1) === nivel){
        $scope.historyBack = true;
    }

    if (nivel === 5){
        $scope.newUrl = '/jovenes/';
    } else {
        $scope.newUrl = '/estructura/'+tipo+'/'+nivel+'/';
    }

    switch (+nivel) {
        case 2:
            // Administrador o Nacional
            $scope.nivel = 'Nacional';
            break;
        case 3:
            // Region
            $scope.nivel = 'Región';
            break;
        case 4:
            // Distrito
            $scope.nivel = 'Distrito';
            break;
        case 5:
            // Grupo
            $scope.nivel = 'Grupo';
            break;
    }

    apiFactory.estructura(nivel, estructura).then(function(response){
        $scope.lista = response.data;
    });
});
