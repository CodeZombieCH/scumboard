'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: String,
  description: String,
  status: String,
  cost: Number,
  owner: String
});

module.exports = mongoose.model('Task', TaskSchema);
