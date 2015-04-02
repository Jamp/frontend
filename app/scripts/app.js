'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
.module('frontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'googlechart',
    'angular-jwt',
    'angular-storage'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider) {
    $stateProvider
    .state('entrar', {
        url: '/entrar',
        templateUrl: 'views/entrar.html',
        controller: 'EntrarCtrl',
        publicView: true
    })
    .state('inicio',{
        url: '/inicio',
        templateUrl: 'views/inicio.html',
        controller: 'InicioCtrl'
    });

    $urlRouterProvider.otherwise('/entrar');

    // Validación del JWT Token
    jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('token');
    };
    $httpProvider.interceptors.push('jwtInterceptor');

}).run(function($rootScope, $state, store, jwtHelper) {
    // Validar Acceso a la app
    $rootScope.$on('$stateChangeStart', function(e, to) {
        if (!to.publicView) {
            if (!store.get('token') || jwtHelper.isTokenExpired(store.get('token'))) {
                e.preventDefault();
                $rootScope.resetAlert();
                store.remove('me');
                store.remove('token');
                $state.go('entrar');
            }
        }
    });
    // Sistema de Alertas
    $rootScope.alerts = [];
    $rootScope.addAlert = function(mensaje, tipo) {
        tipo = (tipo === undefined)?'warning':tipo;
        $rootScope.alerts.push( {msg: mensaje, type: tipo});
    };
    $rootScope.oneAlert = function(mensaje, tipo) {
        $rootScope.alerts = [];
        tipo = (tipo === undefined)?'warning':tipo;
        $rootScope.alerts.push( {msg: mensaje, type: tipo});
    };
    $rootScope.closeAlert = function(index) {
        $rootScope.alerts.splice(index, 1);
    };
    $rootScope.resetAlert= function(){
        $rootScope.alerts = [];
    };

    // Helper para la interpretación del status de retorno del servidor
    $rootScope.httpCode = function(code) {
        var msg = 'Oops!!! ha de ocurrir un error, esto sí que no lo esperabamos :(';
        if (code === 500){
            msg = 'Error interno en el Servidor';
        } else if (code === 400) {
            msg = 'Parámetros no recibidos';
        } else if (code === 401) {
            msg = 'Usuario o Contraseña incorrectos';
        } else if (code === 403) {
            msg = 'Acceso Denegado';
        } else if (code === 404){
            msg = 'Servidor no encontrado, verifique su conexión a internet';
        } else if (code === 201) {
            msg = '{0} creado éxitosamente';
        } else if (code === 202){
            msg = '{0} actualizado éxitosamente';
        } else if (code === 200){
            return true;
        }
        return msg;
    };
});
