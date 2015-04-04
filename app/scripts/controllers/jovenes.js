'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:JovenesCtrl
 * @description
 * # JovenesCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
.controller('JovenesCtrl', function ($scope, $stateParams, store, apiFactory) {
    apiFactory.jovenes($stateParams.ramaId).then(function(response){
        $scope.lista = response.data;
    }, function(error){

    });
});
