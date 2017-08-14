/**
 * Wrapper JS required on server.js used to load mongoose models.
 */

const Task = require('./task-model');
const Upload = require('./upload-model');

module.exports = {
	Task,
	Upload
};
