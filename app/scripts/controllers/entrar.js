'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:EntrarCtrl
 * @description
 * # EntrarCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('EntrarCtrl', function ($rootScope, $scope, $state, jwtHelper, store, apiFactory) {
        if (store.get('token') && !jwtHelper.isTokenExpired(store.get('token'))) {
            $rootScope.logged = true;
            $state.go('inicio');
        }

        $scope.login = {};

        $scope.button = {
            text: 'Entrar',
            enable: true
        };

        $scope.iniciarSesion = function() {
            $scope.button = {
                text: 'Espere...',
                enable: false
            };
            $rootScope.oneAlert('Autenticando...', 'info');
            apiFactory.inicioSesion($scope.login)
            .then(function(response){
                var rsp = $rootScope.httpCode(response.status);
                if ( rsp ) {
                    var token = response.data.token;
                    var identidad = jwtHelper.decodeToken(token);
                    var me = {
                        id: identidad.id,
                        nombre: identidad.primer_nombre+' '+identidad.segundo_nombre+' '+identidad.primer_apellido+' '+identidad.segundo_apellido,
                        nivel: identidad.nivel,
                        estructura: identidad.estructura_id,
                        region: identidad.region_id,
                        distrito: identidad.distrito_id,
                        grupo: identidad.grupos_id,
                        rama: identidad.ramas_id,
                        tipo: identidad.tipo,
                        ultima: identidad.ultima_conexion,

                        expire: identidad.exp,
                        create: identidad.iat
                    };
                    $rootScope.logged = true;
                    $rootScope.resetAlert();
                    store.set('token', token);
                    store.set('me', me);
                    $state.go('inicio');
                }
            }, function(error){
                var rsp = $rootScope.httpCode(error.status);
                    $rootScope.oneAlert(rsp);
                    $scope.button = {
                        text: 'Entrar',
                        enable: true
                    };
            });
        };
  });
