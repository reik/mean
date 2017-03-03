(function() {
    'use strict';

    angular
        .module('app.shows')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    
    function coreMenu(Menus){

        Menus.addMenuItem('sidebar', {
            title: 'Manage Shows',
            state: 'app.showlinks',
            type: 'dropdown',
            iconClass: 'icon-eye',
            position: 3,
            roles: ['admin']
        });

        Menus.addSubMenuItem('sidebar', 'app.showlinks', {
            title: 'List',
            state: 'app.list-shows'
        });
        Menus.addSubMenuItem('sidebar', 'app.showlinks', {
            title: 'Create',
            state: 'app.create-shows'
        });
        Menus.addSubMenuItem('sidebar', 'app.showlinks', {
            title: 'View',
            state: 'app.view-shows'
        });
       
    }

})();