'use strict';

angular.module('users.admin')
    .controller('UsersBulkUploadController', ['$scope', '$timeout', '$window', 'Authentication', 'FileUploader', '$filter', '$state',
        function($scope, $timeout, $window, Authentication, FileUploader, $filter, $state) {

            // Create file uploader instance
            $scope.uploader = new FileUploader({
                url: 'api/users/csv',
                alias: 'csvData'
            });

            // Set file uploader image filter
            $scope.uploader.filters.push({
                name: 'imageFilter',
                fn: function(item, options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    //return '|vnd.ms-excel|'.indexOf(type) !== -1; //does not work with mac
                    return true;
                }
            });
            

            // Called after the user has successfully uploaded csv
            $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
                // Show success message
                $scope.success = response.message;
                // Clear upload buttons
                $scope.cancelUpload();
            };

            // Called after the user has failed to upload a csv file
            $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
                // Clear upload buttons
                $scope.cancelUpload();
                if ('The user creation is incomplete.' === response.message) {
                    $state.go('app.users-list');
                }
                // Show error message
                $scope.error = response.message;
            };

            // Change user profile picture
            $scope.uploadCSV = function() {
                // Clear messages
                $scope.success = $scope.error = null;

                // Start upload
                $scope.uploader.uploadAll();
            };

            // Cancel the upload process
            $scope.cancelUpload = function() {
                $scope.uploader.clearQueue();
            };
        }
    ]);
