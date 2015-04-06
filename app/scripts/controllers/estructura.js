'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:EstructuraCtrl
 * @description
 * # EstructuraCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
.controller('EstructuraCtrl', function ($rootScope, $scope, $window, $stateParams, store, apiFactory) {
    var nivel = $stateParams.nivelId;
    var estructura = $stateParams.estructuraId;
    var usuario = store.get('me');
    $scope.form = {};

    switch (+nivel) {
        case 2:
            // Region
            $scope.nivel = 'Nueva Región';
            break;
        case 3:
            // Distrito
            $scope.nivel = 'Nuevo Distrito';
            $scope.form.estructura = estructura;
            break;
        case 4:
            // Grupo
            $scope.nivel = 'Nuevo Grupo';
            $scope.form.estructura = estructura;
            break;
    }

    $scope.fnNuevaEstructura = function(){
        $rootScope.oneAlert('Procesando...', 'info');
        apiFactory.nuevoEstructura(nivel, $scope.form).then(function(response){
            $rootScope.oneAlert($scope.nivel+' ha sido creado exitosamente!!!', 'success');
        }, function(error){
            var msg = $rootScope.httpCode(error.status);
            $rootScope.oneAlert(msg, 'error');
        });
        $window.history.back();
    }
});
