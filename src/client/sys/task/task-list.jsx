import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TaskListItem from './task-list-item';
import { ListGroup } from 'react-bootstrap';

export default class TaskList extends React.Component {

	renderItems() {
		const props = _.omit(this.props, 'tasks');
		return _.map(this.props.tasks, (task, index) => <TaskListItem key={index} {...task} {...props} />);
	}

	render() {
		if (this.props.tasks.length === 0) {
			return <div>{'Nothing to do, go and watch some Netflix'}</div>;
		}

		return (
			<div>
				<ListGroup>
					{this.renderItems()}
				</ListGroup>
			</div>
			);
	}
}

TaskList.propTypes = {
	tasks: PropTypes.array
};
