'use strict';

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller'),
    fs = require('fs'),
    path = require('path'),
    config = require(path.resolve('./config/config'));

  // Setting up the users profile api
  app.route('/api/users').get(users.index);
  app.route('/api/users/me').get(users.me);
  app.route('/api/users').put(users.update);  
  app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/users/password').post(users.changePassword);
  app.route('/api/users/picture').post(users.changeProfilePicture);

  app.get('/image/:id', function (req, res) {  
    res.setHeader('Content-Type', 'image/jpg');
    fs.createReadStream(path.join(config.uploads.profileUpload.dest, req.params.id)).pipe(res);
  });

  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
