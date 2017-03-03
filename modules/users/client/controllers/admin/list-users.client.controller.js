'use strict';

angular.module('users.admin').controller('UserListController', ['$scope', '$filter', 'Authentication', 'Admin', '$q',
    function($scope, $filter, Authentication, Admin, $q) {

        Admin.query(function(data) {
            $scope.users = [];
            if (data && data.length > 0) {
                data.forEach(function(user) {                   
                    if (String(user._id).trim() !== String(Authentication.user._id).trim() && user.roles.indexOf('admin') === -1) {
                        $scope.users.push(user);
                    }
                });
            }
           
            $scope.buildPager();
        });

        $scope.buildPager = function() {
            $scope.pagedItems = [];
            $scope.itemsPerPage = 1000;
            $scope.currentPage = 1;
            $scope.figureOutItemsToDisplay();
        };

        $scope.figureOutItemsToDisplay = function() {
            $scope.filteredItems = $filter('filter')($scope.users, {
                $: $scope.search
            });
            $scope.filterLength = $scope.filteredItems.length;
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
            var end = begin + $scope.itemsPerPage;
            $scope.pagedItems = $scope.filteredItems.slice(begin, end);
        };

        $scope.pageChanged = function() {
            $scope.figureOutItemsToDisplay();
        };
       
    }
]);
