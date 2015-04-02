'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:InicioCtrl
 * @description
 * # InicioCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('InicioCtrl', function ($rootScope, $scope, apiFactory, store) {
    $scope.usuario = store.get('me');
    $scope.estadisticas = {
        total: 0,
        participacion: {
            cval: 0,
            cac: 0
        },
        logros: {
            cval: 0,
            cac: 0
        }
    };

    // Ultimas actividades
    apiFactory.lastest().then(
        function(response) {
            $scope.actividades = response.data;
        }, function() {
            $rootScope.addAlert('Ha ocurrido un error de comunicación, Por favor contacte al soporte', 'danger');
            $scope.actividades = false;
        }
    );

    // Total de Jóvenes.then(function(response){
    apiFactory.count().then(
        function(response) {
            $scope.estadisticas.total = response.data.cantidad;
        }, function() {
            $rootScope.addAlert('Ha ocurrido un error de comunicación, Por favor contacte al soporte', 'danger');
            $scope.estadisticas = false;
        }
    );

    // Cálculo de Paticipación
    apiFactory.participation().then(
        function(response) {
            response.data.forEach(function(i){
               if (+i.cval === 1) {
                   if (i.creditos >= 100) {
                       $scope.estadisticas.logros.cval += 1;
                   } else if (i.creditos > 0 && i.creditos < 100 ) {
                       $scope.estadisticas.participacion.cval += 1;
                   }
               } else {
                   if (i.creditos >= 100) {
                       $scope.estadisticas.logros.cac += 1;
                   } else if (i.creditos > 0 && i.creditos < 100 ) {
                       $scope.estadisticas.participacion.cac += 1;
                   }
               }
            });
        }, function(){
            $rootScope.addAlert('Ha ocurrido un error de comunicación, Por favor contacte al soporte', 'danger');
            $scope.estadisticas = false;
        }
    );

    $scope.chartObject = {};

    $scope.chartObject.data = {'cols': [
        {id: 't', label: 'Topping', type: 'string'},
        {id: 's', label: 'Media Nacional', type: 'number'},
        {id: 's', label: 'Propia', type: 'number'}
    ], 'rows': [
        {c: [
            {v: 'Ene'},
            {v: 3},
            {v: 3}
        ]},
        {c: [
            {v: 'Feb'},
            {v: 3},
            {v: 4}
        ]},
        {c: [
            {v: 'Mar'},
            {v: 3},
            {v: 3}
        ]},
        {c: [
            {v: 'Abr'},
            {v: 3},
            {v: 4}
        ]},
        {c: [
            {v: 'May'},
            {v: 5},
            {v: 3}
        ]},
        {c: [
            {v: 'Jun'},
            {v: 3},
            {v: 4}
        ]},
        {c: [
            {v: 'Jul'},
            {v: 1},
            {v: 3}
        ]},
        {c: [
            {v: 'Ago'},
            {v: 3},
            {v: 4}
        ]},
        {c: [
            {v: 'Sep'},
            {v: 3},
            {v: 3}
        ]},
        {c: [
            {v: 'Oct'},
            {v: 3},
            {v: 4}
        ]},
        {c: [
            {v: 'Nov'},
            {v: 3},
            {v: 3}
        ]},
        {c: [
            {v: 'Dic'},
            {v: 3},
            {v: 4}
        ]},

    ]};

    $scope.chartObject.type = 'LineChart';
    $scope.chartObject.options = {
        'title': 'Media Nacional vs Propias',
        'legend': { 'position': 'bottom' }
    };
});
