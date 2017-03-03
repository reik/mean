(function () {
    'use strict';

    angular
        .module('app.company')
        .config(appRoutes);
    appRoutes.$inject = ['$stateProvider', 'RouteHelpersProvider'];

    function appRoutes($stateProvider, helper) {

        $stateProvider
            .state('app.company-registration', {
                url: '/company/registration',
                templateUrl: 'modules/company/client/views/company-register.client.view.html'
            });

    }
})();