'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Show = mongoose.model('Show'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * List of Shows
 */
exports.list = function (req, res) {
  Show.find().sort('-date').exec(function (err, shows) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(shows);
    }
  });
};

/**
 * Create a article
 */
exports.create = function (req, res) {
  var show = new Show(req.body);

  show.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(show);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.show);
};

/**
 * Update a article
 */
exports.update = function (req, res) {

};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var show = req.show;
  
  show.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(show);
  });
};



/**
 * Article middleware
 */
exports.showByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Show is invalid'
    });
  }

  Show.findById(id).exec(function (err, show) {
    if (err) {
      return next(err);
    } else if (!show) {
      return res.status(404).send({
        message: 'No show with that identifier has been found'
      });
    }
    req.show = show;
    next();
  });
};
