'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:NavegarCtrl
 * @description
 * # NavegarCtrl
 * Controller of the frontendApp
 */

///
// FIXME: Corregir el asunto de los parámetros opcionales en la URL
///

angular.module('frontendApp')
.controller('NavegarCtrl', function ($scope, $stateParams, $location, store) {
    var usuario = store.get('me');

    var tipo = $stateParams.tipo;
    var estructura = usuario.estructura;
    var nivel = usuario.nivel;
    var url = '/estructuras/'+tipo+'/'+nivel+'/'+estructura;

    if (+nivel === 5) {
        url = '/jovenes/'+estructura;
    }

    $location.path(url);
});
