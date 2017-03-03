(function () {
    'use strict';

    angular
        .module('app.charts')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    function coreMenu(Menus) {
        return undefined;
    }

})();