(function () {
  'use strict';

  angular
    .module('app.settings')
    .run(settingsRun);

  settingsRun.$inject = ['$rootScope', '$localStorage'];

  function settingsRun($rootScope, $localStorage) {


    // User Settings
    // -----------------------------------
    $rootScope.user = {
      name: 'John',
      job: 'ng-developer',
      picture: 'img/user/02.jpg'
    };

    // Hides/show user avatar on sidebar from any element
    $rootScope.toggleUserBlock = function () {
      $rootScope.$broadcast('toggleUserBlock');
    };

    // Global Settings
    // -----------------------------------
    $rootScope.app = {
      name: 'DWTC Admin',
      description: 'Admin App',
      year: ((new Date()).getFullYear()),
      layout: {
        isFixed: true,
        isCollapsed: false,
        isBoxed: false,
        isRTL: false,
        horizontal: false,
        isFloat: false,
        asideHover: false,
        theme: 'themes/theme-e.css',
        asideScrollbar: false,
        isCollapsedText: false
      },
      useFullLayout: false,
      hiddenFooter: false,
      offsidebarOpen: false,
      asideToggled: false,
      viewAnimation: 'ng-fadeInUp'
    };

    // Close submenu when sidebar change from collapsed to normal
    $rootScope.$watch('app.layout.isCollapsed', function (newValue) {
      if (newValue === false)
        $rootScope.$broadcast('closeSidebarMenu');
    });

  }

})();
