import React from 'react';
import PropTypes from 'prop-types';
import { AsyncButton } from '../../components/index';
import { server } from '../../core/server.js';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { app } from '../../core/app';

export default class TaskCreate extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			fetching: false,
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
	}

	handleCreate() {
		const self = this;

		self.setState({ fetching: true });

		const taskName = self.state.value;
		const validateInput = self.getValidationMessage();

		if (validateInput) {
			self.setState({ fetching: false });
			return;
		}

		// request server
		server.post('api/tasks', { name: taskName })
			.then(data => {
				self.setState({ fetching: false, value: '' });
				app.dispatch('TASK_CREATED', data);
			});
	}

	getValidationMessage() {
		const taskName = this.state.value;
		if (taskName === '') {
			return 'Please enter a task';
		} else if (_.find(this.props.tasks, task => task.name === taskName)) {
			return 'Task already exists';
		}

		return null;
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	render() {
		const fetching = this.state.fetching;

		const validationMessage = this.getValidationMessage();

		return (
				<div>
					<FormGroup controlId="taskName" validationState={validationMessage ? 'error' : 'success'}>
						<ControlLabel>{'What do I need to do?'}</ControlLabel>
						<FormControl
							type="text"
							value={this.state.value}
							placeholder="Enter a task activity"
							onChange={this.handleChange}/>
						<FormControl.Feedback />
						{validationMessage ? <HelpBlock>{validationMessage}</HelpBlock> : null}
					</FormGroup>
					<AsyncButton onClick={this.handleCreate} fetching={fetching}>{'Create'}</AsyncButton>
				</div>
			);
	}
}

TaskCreate.propTypes = {
	tasks: PropTypes.array
};
