'use strict';

/**
 * @ngdoc directive
 * @name frontendApp.directive:components
 * @description
 * # components
 */
angular.module('frontendApp')
.directive('inputSearch', function () {
    return {
        restrict: 'E',
        scope: {
            model: '=model'
        },
        template: '<div class="input-search"><i class="fa fa-search"></i><input type="search" ng-model="model"><i class="fa fa-close" ng-class="{hidden: !model}"></i></div>',
        link: function(scope, element) {
                $(element).find('i.fa-close').on('click', function() {
                    scope.model = '';
                    scope.$apply();
                });
        }
    };
})
.directive('btnBack', function($window){
    return {
        restrict: 'E',
        template: '<a href class="btn btn-warning"><i class="fa fa-chevron-left"></i> Volver</a>',
        link: function(scope, element) {
            $(element).on('click', function() {
                $window.history.back();
            });
        }
    };
});
