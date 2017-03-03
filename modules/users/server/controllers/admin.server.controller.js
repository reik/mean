'use strict';
/* jshint ignore:start */
/**
 * Module dependencies.
 */

var path = require('path'),
    fs = require('fs'),
    Parse = require('csv-parse'),
    mongoose = require('mongoose'),
    shortid = require('shortid'),
    multer = require('multer'),
    config = require(path.resolve('./config/config')),
    User = mongoose.model('User'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


var parseCSVFile = function(sourceFilePath, columns, onNewRecord, handleError, done) {
    var source = fs.createReadStream(sourceFilePath),
        linesRead = 0,
        parser = Parse({
            delimiter: ',',
            columns: columns
        });

    parser.on('readable', function() {
        var record;
        while (record = parser.read()) {
            linesRead++;
            onNewRecord(record);
        }
    });

    parser.on('error', function(error) {
        handleError(error);
    });

    parser.on('end', function() {
        done(linesRead);
    });

    source.pipe(parser);
};


var createUser = function(newUser) {
    var user = new User(newUser);

    // Add missing user fields
    user.provider = 'local';
    user.displayName = user.firstName + ' ' + user.lastName;
    user.password = 'User123456#';
    //generate random username
    user.username = shortid.generate();

    // Then save the user
    return user.save();
};

/**
 * Create an array of roles given a string of roles from csv
 * @param string rolesStr string of roles from CSV file
 * @returns array
 */
var createRolesFromCsv = function(rolesStr) {
    var roles = rolesStr.split(','),
        role, i, len = roles.length, store = [];

    if (Object.prototype.toString.call(rolesStr) != '[object String]') {
        return store;
    }

    for (i = 0; i < len; i++) {
        role = roles[i];
        if (role && role.toLowerCase().trim() === 'admin') {
            continue;
        }
        store.push(role.toLowerCase().trim());
    }

    return store;
};



var parseFile = function(req, res, next) {
    var filePath = req.file.path,
        users = [],
        isValid = false,
        columns = true;

    function onNewRecord(record) {
        isValid = (record.hasOwnProperty('email') &&
            record.hasOwnProperty('firstName') && record.hasOwnProperty('lastName') &&
            record.hasOwnProperty('roles'));
        if (isValid) {
            users.push(record);
        }
    }


    function onParseError(error) {
        return res.status(400).send({
            message: 'Error occurred while parsing csv.'
        });
    }

    function done(linesRead) {
        var Promise = require('bluebird'),
            promises = [],
            user;

        for (var i = 0; i < users.length; i++) {
            user = users[i];
            user.roles = createRolesFromCsv(user.roles); //convert the comma separated roles to array           
            var result = createUser(user);
            promises.push(result);
        }

        return Promise.all(promises).then(function(data) {
            return res.status(200).send({
                message: 'Successfully created ' + data.length + ' users from CSV.'
            });
        }).catch(function(err) {
            return res.status(400).send({
                message: 'The user creation is incomplete.'
            });
        });
    }

    return parseCSVFile(filePath, columns, onNewRecord, onParseError, done);
};


/**
 * Show the current user
 */
exports.read = function(req, res) {
    res.json(req.model);
};

/**
 * Parse csv file from uploads
 */
exports.parseCsv = function(req, res, next) {
    var upload = multer(config.uploads.bulkUsersCsvUpload).single('csvData');
    upload(req, res, function(uploadError) {
        if (uploadError) {
            return res.status(400).send({
                message: 'Error occurred while uploading csv.'
            });
        } else {
            parseFile(req, res, next);
        }
    });
};


exports.create = function(req, res) {
    var user = new User(req.body);

    // Add missing user fields
    user.provider = 'local';
    user.displayName = user.firstName + ' ' + user.lastName;
    user.password = 'User123456#';
    //generate random username
    user.username = shortid.generate();

    user.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(user);
    });
};

/**
 * Update a User
 */
exports.update = function(req, res) {
    var user = req.model;

    //For security purposes only merge these parameters
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.displayName = user.firstName + ' ' + user.lastName;
    user.roles = req.body.roles;
    user.email = req.body.email;
    user.priceGroup = req.body.priceGroup;

    User.findOne({
        email: req.body.email.toLowerCase().trim()
    }, function(err, foundUser) {

        var errorMsg = 'Email already exist.';
        if (err || (foundUser && String(foundUser._id) !== String(req.body._id))) {
            if (err) {
                errorMsg = errorHandler.getErrorMessage(err);
            }
            return res.status(400).send({
                message: errorMsg
            });
        }

        user.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            res.json(user);
        });

    });


};

/**
 * Delete a user
 */
exports.delete = function(req, res) {
    var user = req.model;

    user.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(user);
    });
};


/**
 * List of Users
 */
exports.list = function(req, res) {
    User.find({}, '-salt -password').sort('-created').populate('user', 'displayName').exec(function(err, users) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(users);
    });
};

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'User is invalid'
        });
    }

    User.findById(id, '-salt -password').exec(function(err, user) {
        if (err) {
            return next(err);
        } else if (!user) {
            return next(new Error('Failed to load user ' + id));
        }

        req.model = user;
        next();
    });
};
