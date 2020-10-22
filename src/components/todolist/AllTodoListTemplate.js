import React, { Component } from 'react';
import AllTodoList from './AllTodoList';
import { TodoListProvider } from './AllTodoListContext';
import TodoTemplate from '../todocard/TodoTemplate';

class AllTodoListTemplate extends Component {
	state = {
		viewkeyid : null
	};

	handleViewOn = (data) => {
		this.setState({
			viewkeyid : data ? data.keyid : null
		});
	};

	render() {
		return (
			<TodoListProvider onViewOffEvent={this.handleViewOn}>
				<div className="all-todo-list-template-block">
					<AllTodoList onClickView={this.handleViewOn}/>
				</div>
				{this.state.viewkeyid && <TodoTemplate {...this.state}/>}
			</TodoListProvider>
		);
	}
}

export default AllTodoListTemplate;