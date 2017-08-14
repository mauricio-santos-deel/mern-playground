/* global module */

module.exports = function(app) {
	var taskController = require('../controllers/task-controller');

	// taskList Routes
	app.route('/api/tasks')
		.get(taskController.listAllTasks)
		.post(taskController.createTask);


	app.route('/api/tasks/:taskId')
		.get(taskController.readTask)
		.put(taskController.updateTask)
		.delete(taskController.deleteTask);
};
