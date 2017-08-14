/**
 * Wrapper function used on server.js to set API routes.
 */

module.exports = function(app) {

	// local varioable used to store temp route function
	let routeFunc;

	// Tasks CRUD API Routes
	routeFunc = require('./task-routes');
	routeFunc(app);

	// Upload Routes
	routeFunc = require('./upload-routes');
	routeFunc(app);
};
