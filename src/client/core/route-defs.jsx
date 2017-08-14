import React from 'react';
import { Route, Switch } from 'react-router-dom';

// page components
import Home from '../pub/home';
import Login from '../pub/login';
import NotFound from '../pub/notfound';
import ErrorPage from '../pub/error';

import TaskCrud from '../sys/task/task';
import Upload from '../sys/upload/upload';


/**
 * Initial page that declare all routes of the module
 */
export default class RouteDefs extends React.Component {

	render() {
		const routes = [
			{ exact: true, path: '/', component: Home },
			{ exact: true, path: '/login', component: Login },
			{ exact: true, path: '/home', component: Home },
			{ exact: true, path: '/tasks', component: TaskCrud },
			{ exact: true, path: '/upload', component: Upload },
			{ exact: true, path: '/error', component: ErrorPage },
			{ exact: false, component: NotFound }
		];

		return (
			<Switch>
				{
					routes.map((item, i) => <Route key={i} exact={item.exact ? item.exact : false} path={item.path} component={item.component}/>)
				}
			</Switch>
			);
	}
}
