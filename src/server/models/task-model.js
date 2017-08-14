/* global module */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Kindly enter the name of the task']
  },
  CreatedDate: {
    type: Date,
    default: Date.now
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  taskType: {
    type: String,
    enum: ['Coffee', 'Tea']
  }
});

module.exports = mongoose.model('tasks', TaskSchema);
