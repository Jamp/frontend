'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:EstructuraCtrl
 * @description
 * # EstructuraCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
.controller('EstructurasCtrl', function ($rootScope, $scope, $location, $stateParams, store, apiFactory) {
    var nivel = (+$stateParams.nivelId)?+$stateParams.nivelId+1:undefined;
    var estructura = $stateParams.estructuraId;
    var tipo = $stateParams.tipo;
    var usuario = store.get('me');

    var fnCargar = function(){
        apiFactory.estructura(nivel, estructura).then(function(response){
            $scope.lista = response.data;
        }, function(){
            $rootScope.oneAlert('Ha occurrido un error!!! ', 'danger');
        });
    };

    if ((+usuario.nivel+1) === nivel){
        $scope.historyBack = true;
    }

    if (nivel === 5){
        $scope.newUrl = '/jovenes/';
    } else {
        $scope.newUrl = '/estructuras/'+tipo+'/'+nivel+'/';
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

    fnCargar();

    $scope.fnBorrar = function(id) {
        $rootScope.oneAlert('Procesando...', 'info');
        apiFactory.borrarEstructura(nivel, id).then(function(){
            fnCargar();
            $rootScope.oneAlert('Borrado éxitoso', 'success');
        }, function(error){
            var msg = $rootScope.httpCode(error.status);
            $rootScope.oneAlert(msg, 'danger');
        });
    };
});
