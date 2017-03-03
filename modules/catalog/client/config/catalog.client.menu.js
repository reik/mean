(function() {
    'use strict';

    angular
        .module('app.catalog')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    
    function coreMenu(Menus){

        Menus.addMenuItem('sidebar', {
            title: 'Manage Catalogs',
            state: 'app.cataloglinks',
            type: 'dropdown',
            iconClass: 'icon-book-open',
            position: 2,
            roles: ['admin']
        });

        Menus.addSubMenuItem('sidebar', 'app.cataloglinks', {
            title: 'Manage Show Category',
            state: 'app.catalog-show-category'
        });
        Menus.addSubMenuItem('sidebar', 'app.cataloglinks', {
            title: 'Manage Show Products',
            state: 'app.catalog-show-products'
        });
       
    }

})();