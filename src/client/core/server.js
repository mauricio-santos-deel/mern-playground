/**
 * Handle requests to the server
 */

import Request from 'superagent';

/**
 * Custom error handler, defined by the application
 */
var customErrorHandler;

export function onRequestError(handler) {
	customErrorHandler = handler;
}


class ServerRequest {

	/**
	 * Create a request GET to the given URL
	 * @param  {String} url The remote address
     * @param  {function} callback called when server answers
	 * @return {Request}    Request object
	 */
	get(url) {
		return this.promiseRequest(Request.get(url));
	}


	/**
	 * Create a request POST to the given URL
	 * @param  {String} url The remote address
	 * @return {Request}    Request object
	 */
	post(url, data) {
		return this.promiseRequest(Request
			.post(url)
			.send(data));
	}

	/**
	 * Create a request POST to the given URL
	 * @param  {String} url The remote address
	 * @return {Request}    Request object
	 */
	postFile(url, file, data) {
		const req = Request
			.post(url)
			.attach('file', file);

		for (var propertyName in data) {
			req.field(propertyName, data[propertyName]);
		}

		return this.promiseRequest(req);
	}

	/**
	 * Create a request PUT to the given URL
	 * @param  {String} url The remote address
	 * @return {Request}    Request object
	 */
	put(url, data) {
		return this.promiseRequest(Request
			.put(url)
			.send(data));
	}

	/**
	 * Send a delete post
	 * @param  {String} url [description]
	 * @return {Request}     [description]
	 */
	delete(url) {
		return this.promiseRequest(Request
			.del(url));
	}

	promiseRequest(request) {
		return new Promise((resolve, reject) => {
			request
				.use(errorHandler)
				.end((err, res) => {
					if (err) {
						reject(err);
					}
					else {
						/* eslint no-console: 0 */
						console.log(res.body);
						resolve(res.body);
					}
				});
		});
	}
}

var server = new ServerRequest();

export { server };

function errorHandler(req) {
	var cb = req.callback;

	req.callback = function(err, res) {
		if (err && !err.status) {
			err.message = 'Connection error';
		}

        cb.call(req, err, res);

        if (err && customErrorHandler) {
			customErrorHandler(err);
        }
	};

	return req;
}
