import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import TaskList from './task-list';
import TaskCreate from './task-create';
import { server } from '../../core/server';
import { app } from '../../core/app';

export default class TaskCrud extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			fetchingList: false,
			tasks: []
		};

		this.fetchData = this.fetchData.bind(this);
		this.deleteTask = this.deleteTask.bind(this);
		this.taskCreatedListener = this.taskCreatedListener.bind(this);
		this.toggleTask = this.toggleTask.bind(this);
		this.saveTask = this.saveTask.bind(this);
		this.deleteTask = this.deleteTask.bind(this);
	}

	componentDidMount() {
		app.add(this.taskCreatedListener);
		this.fetchData();
	}

	componentWillUnmount() {
		app.remove(this.taskCreatedListener);
	}

	fetchData() {
		const self = this;

		self.setState({ fetchingList: true });

		server.get('api/tasks')
			.then(data => {
				const tasks = data.length > 0 ? data : [];
				self.setState({ fetchingList: false, tasks: tasks });
			});
	}

	/**
	 * Using observer approach to send data from children to parent
	 */
	taskCreatedListener(action, task) {
		if (action !== 'TASK_CREATED') {
			return;
		}

		if (this.state.tasks) {
			this.state.tasks.push(task);
			this.setState({ tasks: this.state.tasks });
		} else {
			this.setState({ tasks: [task] });
		}
	}

	/**
	* Children doesn't have a function, this function is directly passed to UI onClick event
	* on childre
	*/
	toggleTask(task) {
		const foundTask = _.find(this.state.tasks, item => item._id === task._id);

		foundTask.isCompleted = !foundTask.isCompleted;

		/**
		 * todo: .then
		 */
		server.put('api/tasks/' + task._id, { isCompleted: foundTask.isCompleted });

		this.setState({ tasks: this.state.tasks });
	}

	saveTask(oldTask, newTask) {
		/**
		 * todo: .then
		 */
		server.put('api/tasks/' + oldTask._id, { name: newTask.name });

		var foundTask = _.find(this.state.tasks, task => task.name === oldTask.name);

		foundTask.name = newTask.name;
		this.setState({ tasks: this.state.tasks });
	}

	/**
	 * Using props function passing param approach to comunicate children with parent
	 */
	deleteTask(taskId) {
		_.remove(this.state.tasks, item => item._id === taskId);

		this.setState({ tasks: this.state.tasks });
	}

	render() {
		return (<Grid>
					<Row>
						<Col sm={12}>
							<h1>{'Task CRUD'}</h1>
						</Col>
					</Row>
					<Row>
						<Col sm={6}>
							<TaskCreate
								tasks={this.state.tasks}/>
						</Col>
						<Col sm={6}>
							{ this.state.fetchingList ? 'fetchingList...' :
								<TaskList
									tasks={this.state.tasks}
									toggleTask={this.toggleTask}
									saveTask={this.saveTask}
									deleteTask={this.deleteTask}/>
							}
						</Col>
					</Row>
				</Grid>);
	}
}
