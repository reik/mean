(function () {
    'use strict';

    angular
        .module('app.catalog')
        .config(appRoutes);
    appRoutes.$inject = ['$stateProvider'];

    function appRoutes($stateProvider) {

        $stateProvider
            .state('app.catalog-show-category', {
                url: '/catalog/show/category',
                templateUrl: 'modules/catalog/client/views/show-category.client.view.html'
            })
            .state('app.catalog-show-products', {
                url: '/catalog/show/products',
                templateUrl: 'modules/catalog/client/views/show-products.client.view.html'
            });

    }
})();