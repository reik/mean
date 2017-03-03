'use strict';

// Setting up route
angular.module('users.admin.routes').config(['$stateProvider', 'RouteHelpersProvider',
  function ($stateProvider, helper) {
    $stateProvider
      .state('app.users-list', {
        url: '/users',
        templateUrl: 'modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController'
      })
      .state('app.user-view', {
        url: '/users/view/:userId',
        templateUrl: 'modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('app.user-edit', {
        url: '/users/edit/:userId',
        templateUrl: 'modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        resolve: helper.resolveFor('ui.select')
      })
      .state('app.user-add', {
        url: '/users/add',
        templateUrl: 'modules/users/client/views/admin/add-user.client.view.html',
        controller: 'AddUserController',
        resolve: helper.resolveFor('ui.select')
      })
      .state('app.user-bulk-upload', {
        url: '/users/upload',
        templateUrl: 'modules/users/client/views/admin/bulk-upload-user.client.view.html',
        controller: 'UsersBulkUploadController',
        resolve: helper.resolveFor('angularFileUpload', 'filestyle')
      });
  }
]);
