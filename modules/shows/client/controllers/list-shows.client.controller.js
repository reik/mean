/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.shows')
        .controller('DataTableController', DataTableController);

    DataTableController.$inject = ['$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$http'];
    function DataTableController($resource, DTOptionsBuilder, DTColumnDefBuilder, $http) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            var apiKey = '362fe4c150b9936d5e738bad8ede1e6a';
            vm.shows = [];

            function formDeleteUrl(itemId, apiKey) {
                return 'https://api.jotform.com/submission/' + itemId + '?apiKey=' + apiKey;
            }

            vm.remove = function (show) {
                $http({
                    method: 'DELETE',
                    url: formDeleteUrl(show.id, apiKey)
                }).then(function (response) {
                    var index = vm.shows.indexOf(show);
                    vm.shows.splice(index, 1);
                }, function (err) {
                    console.log(err);
                });
            };

            function isObject(obj) {
                return obj === Object(obj);
            }

            $http({
                method: 'GET',
                url: 'https://api.jotform.com/form/63495853120154/submissions?apiKey=' + apiKey
            }).then(function successCallback(response) {
                response.data.content.forEach(function (content) {
                    var row = {};
                    row.id = content.id;
                    for (var key in content.answers) {
                        // check also if property is not inherited from prototype
                        if (content.answers.hasOwnProperty(key)) {
                            var formData = content.answers[key];
                            if (!formData.text) {
                                continue;
                            }
                            if (isObject(formData.answer)) {
                                row[formData.text] = (formData.prettyFormat ? formData.prettyFormat : '');
                            }
                            else {
                                row[formData.text] = (formData.answer ? formData.answer : '');
                            }
                        }
                    }
                    vm.shows.push(row);
                });

            }, function errorCallback(err) {
                console.log(err);
            });


            vm.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withDOM('<"html5buttons"B>lTfgitp')
                .withButtons([
                    { extend: 'copy', className: 'btn-sm' },
                    { extend: 'csv', className: 'btn-sm' },
                    { extend: 'excel', className: 'btn-sm', title: 'XLS-File' },
                    { extend: 'pdf', className: 'btn-sm', title: $('title').text() },
                    { extend: 'print', className: 'btn-sm' }
                ]);



        }
    }
})();
