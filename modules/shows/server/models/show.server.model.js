'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ShowSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  city: {
    type: String,
    default: '',
    trim: true,
    required: 'City cannot be blank'
  },
  state: {
    type: String,
    default: '',
    trim: true,
    required: 'State cannot be blank'
  },
  contact: {
    type: String,
    default: '',
    trim: true,
    required: 'Contact cannot be blank'
  }
});

mongoose.model('Show', ShowSchema);
