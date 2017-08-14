import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { server } from '../../core/server';

export default class TaskListItem extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isEditing: false,
			isFetchingDelete: false
		};

		this.handleDelete = this.handleDelete.bind(this);
		this.onSaveCLick = this.onSaveCLick.bind(this);
		this.onCancelEditCLick = this.onCancelEditCLick.bind(this);
		this.onEditCLick = this.onEditCLick.bind(this);
	}

	onEditCLick() {
		this.setState({ isEditing: true });
	}

	onCancelEditCLick() {
		this.setState({ isEditing: false });
	}

	onSaveCLick(event) {
		event.preventDefault();

		var { _id, name } = this.props;

		const oldTask = { _id: _id, name: name };
		const newTask = { _id: _id, name: this.refs.editInput.value };

		this.props.saveTask(oldTask, newTask);

		this.setState({ isEditing: false });
	}

	handleDelete() {
		const self = this;

		this.setState({ isFetchingDelete: true });

		server.delete('api/tasks/' + self.props._id)
			.then(() => {
				self.setState({ isFetchingDelete: false }, self.props.deleteTask(self.props._id));
			});

	}

	renderTaskSection() {
		const { name, isCompleted } = this.props;

		const taskStyle = {
			color: isCompleted ? 'green' : 'red',
			cursor: 'pointer'
		};

		if (this.state.isEditing) {
			return (
				<span>
					<form onSubmit={this.onSaveCLick}>
						<input type="text" defaultValue={name} ref="editInput" />
					</form>
				</span>);
		}

		return (<span style={taskStyle} onClick={this.props.toggleTask}>{name}</span>);
	}

	renderActionSection() {
		if (this.state.isEditing) {
			return (<span>
						<button onClick={this.onSaveCLick}>{'Save'}</button>
						<button onClick={this.onCancelEditCLick}>{'Cancel'}</button>
					</span>);
		}

		return (<span style={{ float: 'right' }}>
					<button onClick={this.onEditCLick}>
						<FontAwesome name="pencil" />
						{'Edit'}
					</button>
					<button onClick={this.handleDelete}>
						<FontAwesome name="trash" />
						{this.state.isFetchingDelete ? 'fetchingDelete' : 'Delete'}
					</button>
				</span>);
	}

	render() {
		return (
				<ListGroupItem>
					{this.renderTaskSection()}
					{this.renderActionSection()}
				</ListGroupItem>
			);
	}

}

TaskListItem.propTypes = {
	_id: PropTypes.string,
	name: PropTypes.string,
	isCompleted: PropTypes.bool,
	saveTask: PropTypes.func,
	toggleTask: PropTypes.func
};
