(function () {
    'use strict';

    angular
        .module('app.company')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];

    function coreMenu(Menus) {
        Menus.addMenuItem('sidebar', {
            title: 'Company',
            state: 'app.company-link',
            type: 'dropdown',
            iconClass: 'icon-globe',
            position: 1,
            roles: ['admin']
        });

        Menus.addSubMenuItem('sidebar', 'app.company-link', {
            title: 'Registration',
            state: 'app.company-registration'
        });
    }



})();