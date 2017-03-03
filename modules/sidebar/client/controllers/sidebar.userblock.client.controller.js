(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$scope', '$state'];
    function UserBlockController($scope, $state) {
        activate();
        
        $scope.redirectToProfile = function(){
            $state.go('app.settings.profile');
        };

        ////////////////

        function activate() {
            $scope.userBlockVisible = true;
            var detach = $scope.$on('toggleUserBlock', function (/*event, args*/) {
                $scope.userBlockVisible = !$scope.userBlockVisible;
            });
            $scope.$on('$destroy', detach);
        }
    }
})();
