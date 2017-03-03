(function () {
    'use strict';

    angular
        .module('app.shows')
        .config(appRoutes);
    appRoutes.$inject = ['$stateProvider', 'RouteHelpersProvider'];

    function appRoutes($stateProvider, helper) {

        $stateProvider
            .state('app.create-shows', {
                url: '/create/shows',
                templateUrl: 'modules/shows/client/views/create-shows.client.view.html',
                controller: 'CreateShowsController',
                controllerAs: 'todo',                
                data: {
                    roles: ['user', 'admin']
                }
            })
            .state('app.view-shows', {
                url: '/view/shows',
                templateUrl: 'modules/shows/client/views/view-shows.client.view.html',
                data: {
                    roles: ['user', 'admin']
                }
            })
            .state('app.list-shows', {
                url: '/list/shows',
                controller: 'DataTableController',
                templateUrl: 'modules/shows/client/views/list-shows.client.view.html',
                resolve: helper.resolveFor('datatables'),
                data: {
                    roles: ['user', 'admin']
                }
            });

    }
})();