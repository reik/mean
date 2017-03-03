(function () {
    'use strict';

    angular
        .module('app.pricing')
        .config(appRoutes);
    appRoutes.$inject = ['$stateProvider'];

    function appRoutes($stateProvider) {
        $stateProvider
            .state('app.price-tiers', {
                url: '/pricing/show/tiers',
                templateUrl: 'modules/pricing/client/views/show-price-tier.client.view.html',
                data: {
                    roles: ['user', 'admin']
                }
            });
    }
})();