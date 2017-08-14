import React from 'react';
import { render } from 'react-dom';

import { onRequestError } from './server.js';
import MainPage from './main-page';

/**
 * Reference to the application
 */
var app;

export { app };

export function init(customApp) {
	app = customApp;
}

export class App {

	constructor() {
		this.listeners = [];
		onRequestError(this._serverErrorHandler.bind(this));
	}

	/**
	 * Dispatch an action, changing the state of the application
	 * @param {[type]} action The action that generated the state change
	 * @param {[type]} obj  The new state to be merged with the current one
	 */
	dispatch(action, obj) {
		// call listeners
		const lst = this.listeners;
		lst.forEach(listener => {
			listener(action, obj);
		});
	}

	/**
	 * Add a listener that will be notified when application state changes
	 * @param {function} listener A function that will receive app state change notification
	 */
	add(listener) {
		if (this.listeners.indexOf(listener) === -1) {
			this.listeners.push(listener);
		}
	}

	/**
	 * Remove a listener previously added with the add method
	 * @param  {function} listener The listener function previously added
	 */
	remove(listener) {
		var index = this.listeners.indexOf(listener);
		if (index >= 0) {
			this.listeners.splice(index, 1);
		}
	}

	/**
	 * Go to another page
	 * @param  {string} path The new page URL to go to
	 */
	goto(path) {
		/*
		 * todo find a better way to do this with react-router. This way makes the browser reload the whole page.
		 */
		window.location = path;
	}

	/**
	 * Standard handler for server error requests
	 * @param  {object} err object containing information about the error, like status and message
	 */
	_serverErrorHandler(err) {
		if (err.status === 401) {
			this.goto('/login');
		}
		else {
			this.goto('/error');
		}
	}

	/**
	 * Run the application
	 */
	run() {
		// render the main page
		render(
			<MainPage />,
			document.getElementById('container'));
	}
}
