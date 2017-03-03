'use strict';

/**
 * Module dependencies.
 */
var showPolicy = require('../policies/show.server.policy'),
  show = require('../controllers/show.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/shows').all(showPolicy.isAllowed)
    .get(show.list)
    .post(show.create);

  // Single article routes
  app.route('/api/shows/:showId').all(showPolicy.isAllowed)
    .get(show.read)
    .put(show.update)
    .delete(show.delete);

  // Finish by binding the article middleware
  app.param('showId', show.showByID);
};
