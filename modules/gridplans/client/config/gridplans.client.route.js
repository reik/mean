(function () {
    'use strict';

    angular
        .module('app.gridPlans')
        .config(appRoutes);
    appRoutes.$inject = ['$stateProvider'];

    function appRoutes($stateProvider) {

        $stateProvider
            .state('app.grid-plans', {
                url: '/grid/plans',               
                controller: 'GridPlansController',
                templateUrl: 'modules/gridplans/client/views/gridplans.client.view.html',
            });

    }
})();