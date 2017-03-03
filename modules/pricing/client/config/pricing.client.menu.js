(function() {
    'use strict';

    angular
        .module('app.pricing')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    
    function coreMenu(Menus){
        Menus.addMenuItem('sidebar', {
            title: 'Manage Pricing',
            state: 'app.price-tiers',           
            iconClass: 'icon-basket-loaded',
            position: 2,
            roles: ['admin']
        });
    }

})();