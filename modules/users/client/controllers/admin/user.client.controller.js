'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', '$stateParams', 'Admin',
    function($scope, $state, Authentication, $stateParams, Admin) {
        
        $scope.authentication = Authentication;
        $scope.user = Admin.get({
              userId: $stateParams.userId
            });

        $scope.remove = function(user) {
            if (confirm('Are you sure you want to delete this user?')) {
                if (user) {
                    user.$remove();
                    $scope.users.splice($scope.users.indexOf(user), 1);
                } else {
                    $scope.user.$remove(function() {
                        $state.go('app.users-list');
                    });
                }
            }
        };

        $scope.update = function(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');
                return false;
            }
            var user = $scope.user;            
            user.$update(function() {
                $state.go('app.user-view', {
                    userId: user._id
                });
            }, function(errorResponse) {
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
