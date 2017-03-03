'use strict';

// Configuring the Articles module
angular.module('users.admin').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('sidebar', {
      title: 'Manage Users',
      state: 'app.users-list',
      iconClass: 'icon-people',
      position: 3,
      roles: ['admin']
    });
  }

]);
