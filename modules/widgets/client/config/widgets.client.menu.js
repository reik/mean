(function() {
    'use strict';

    angular
        .module('app.widgets')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    function coreMenu(Menus){       
       return undefined;
    }

})();