'use strict';

/**
 * @ngdoc service
 * @name frontendApp.apiFactory
 * @description
 * # apiFactory
 * Factory in the frontendApp.
 */
angular.module('frontendApp')
.factory('apiFactory', function ($http) {
    var base = 'http://localhost/restful/';
    var fecha = new Date();

    // Función para convertir los objetos $scope a x-www-form-urlencoded
    function obj2url(obj, name) {
        var str = [];
        for(var p in obj){
            if (name) {
                str.push(encodeURIComponent(name)+'%5B'+encodeURIComponent(p) + '%5D=' + encodeURIComponent(obj[p]));
            } else {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }
        return str.join('&');
    }

    // Public API here
    return {
        lastest: function() {
            return $http({
                method: 'GET',
                url: base+'actividades/ultimas',
            });
        },
        count: function() {
            return $http({
                method: 'GET',
                url: base+'estadisticas/cantidad/'+fecha.getFullYear(),
            });
        },
        participation: function() {
            return $http({
                method: 'GET',
                url: base+'estadisticas/participacion/'+fecha.getFullYear(),

            });
        },
        inicioSesion: function(login) {
            return $http({
                method: 'POST',
                url: base+'acceso',
                data: obj2url(login),
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            });
        },

        estructura: function(nivel, id) {
            var lugar = 'estructura';
            if (nivel !== 2){
                lugar = lugar+'/'+nivel+'/'+id;
            }
            return $http({
                method: 'GET',
                url: base+lugar
            });
        },
        borrarEstructura: function(nivel, id){
            var lugar = 'estructura/'+nivel+'/'+id;
            return $http({
                method: 'DELETE',
                url: base+lugar
            });
        },
        jovenes: function(rama){
            return $http({
                method: 'GET',
                url: base+'jovenes/'+rama
            });
        },
        usuarios: function(){
            return $http({
                method: 'GET',
                url: base+'usuarios'
            });
        },
        usuario: function(id){
            return $http({
                method: 'GET',
                url: base+'usuarios/'+id
            });
        },
        nuevoUsuario: function(usuario){
            return $http({
                method: 'POST',
                url: base+'usuarios',
                data: obj2url(usuario, 'usuario'),
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            });
        }
    };
});
