
(function () {
    'use strict';

    angular
        .module('app.shows')
        .controller('CreateShowsController', CreateShowsController);

    CreateShowsController.$inject = ['$filter', 'Show'];
    function CreateShowsController($filter, Show) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            Show.query().$promise.then(function (shows) {
                vm.items = shows;
            });


            vm.save = function () {
                Show.save(vm.todo).$promise.then(function (todo) {
                    vm.items.push(todo);
                    vm.todo = null;
                }).catch(function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };


            vm.delete = function (index) {               
                var show = vm.items[index];                
                show.$remove(function (res) {
                    vm.removeTodo(index);
                });
            };


            vm.editingTodo = false;
            vm.todo = {};
            vm.addTodo = function () {

                if (vm.todo.name === '') return;

                if (vm.editingTodo) {
                    vm.todo = {};
                    vm.editingTodo = false;
                }
                else {
                    vm.items.push({ todo: angular.copy(vm.todo), complete: false });
                    vm.todo.name = '';
                    vm.todo.city = '';
                    vm.todo.date = '';
                    vm.todo.state = '';
                    vm.todo.contact = '';
                }
            };

            vm.editTodo = function (index, $event) {
                $event.preventDefault();
                $event.stopPropagation();
                vm.todo = vm.items[index].todo;
                vm.todo.date = new Date(vm.todo.date);
                vm.editingTodo = true;
            };

            vm.removeTodo = function (index/*, $event*/) {
                vm.items.splice(index, 1);
            };

            vm.clearAll = function () {
                vm.items = [];
            };

            vm.totalCompleted = function () {
                return $filter('filter')(vm.items, function (item) {
                    return item.complete;
                }).length;
            };

            vm.totalPending = function () {
                return $filter('filter')(vm.items, function (item) {
                    return !item.complete;
                }).length;
            };


            vm.clear = function () {
                vm.dt = null;
            };

            vm.toggleMin = function () {
                vm.minDate = vm.minDate ? null : new Date();
            };

            vm.toggleMin();

            vm.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                vm.opened = true;
            };

            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.initDate = new Date('2019-10-20');
            vm.formats = ['dd-MMMM-yyyy'];
            vm.format = vm.formats[0];

        }
    }
})();
