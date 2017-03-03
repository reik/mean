'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('app.shows').factory('Show', ['$resource',
  function ($resource) {
    return $resource('api/shows/:showId', {
      showId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

