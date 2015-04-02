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
    'ngRoute',
    'ui.bootstrap',
    'googlechart',
    'angular-jwt',
    'angular-storage'
])
.config(function ($routeProvider, $httpProvider, jwtInterceptorProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/inicio.html',
        controller: 'InicioCtrl',
        publicView: true
    })
    .otherwise({
        redirectTo: '/'
    });

    //$urlRouterProvider.otherwise('/');

    // Validación del JWT Token
    jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('token');
    };
    $httpProvider.interceptors.push('jwtInterceptor');

}).run(function($rootScope, $location, store, jwtHelper) {
    $rootScope.$on('$routeChangeStart', function(e, to) {
        if (!to.publicView) {
            if (!store.get('token') || jwtHelper.isTokenExpired(store.get('token'))) {
                e.preventDefault();
                store.remove('me');
                store.remove('token');
                $location.path('/');
            }
        }
  });
}).run(function($rootScope){
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
    }
});
