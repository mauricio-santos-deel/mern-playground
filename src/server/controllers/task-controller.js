/* global exports */

var mongoose = require('mongoose');
var Task = mongoose.model('tasks');

function dbCallback(err, dbResult, response) {
	if (err) {
		response.send(err);
	} else {
		response.json(dbResult);
	}
}

exports.listAllTasks = function(req, res) {
	Task.find({},
		(err, dbResult) => { dbCallback(err, dbResult, res); }
	);
};

exports.createTask = function(req, res) {
	var newTask = new Task(req.body);

	newTask.save(
		(err, dbResult) => { dbCallback(err, dbResult, res); }
	);
};

exports.readTask = function(req, res) {
	Task.findById(req.params.taskId,
		(err, dbResult) => { dbCallback(err, dbResult, res); }
	);
};

exports.updateTask = function(req, res) {
	Task.findOneAndUpdate({ _id: req.params.taskId },
		req.body,
		{ new: true },
		(err, dbResult) => { dbCallback(err, dbResult, res); }
	);
};

exports.deleteTask = function(req, res) {
	Task.remove({ _id: req.params.taskId },
		(err, dbResult) => { dbCallback(err, dbResult, res); }
	);
};
