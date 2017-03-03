(function() {
    'use strict';
    
    angular
        .module('app.gridPlans')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];

    function coreMenu(Menus) {
        Menus.addMenuItem('sidebar', {
            title: 'Manage Grid Plans',
            state: 'app.grid-plans',
            iconClass: 'icon-grid',
            position: 3,
            roles: ['admin']
        });
    }

})();