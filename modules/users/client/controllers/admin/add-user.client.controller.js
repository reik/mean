'use strict';

angular.module('users.admin').controller('AddUserController', ['$scope', '$state', 'Authentication', 'Admin',
    function($scope, $state, Authentication, Admin) {

        $scope.save = function(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');
                return false;
            }

            if(!$scope.newUser.roles || $scope.newUser.roles.length === 0){
              $scope.error = 'At least one role is required.';
              return false;
            }
            
            Admin.save($scope.newUser).$promise.then(function(user) {
                $scope.newUser = null;
                $state.go('app.users-list');
            }).catch(function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

        $scope.disabled = undefined;

        $scope.enable = function() {
            $scope.disabled = false;
        };

        $scope.disable = function() {
            $scope.disabled = true;
        };
        $scope.priceGroups = ['default', 'special'];
        $scope.roles = ['eso-agent', 'contractor', 'exhibitor', 'ordering', 'billing'];
    }
]);
