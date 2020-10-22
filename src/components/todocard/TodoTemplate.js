import React, { Component } from 'react';
import './TodoTemplate.css';
import TodoHead from './TodoHead';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate'
import {TodoProvider} from './TodoCardContext'
// import { AllTodoViewOffContext } from '../todolist/AllTodoListContext'


class TodoTemplate extends Component {
	
	// static contextType = AllTodoViewOffContext;

	// handleViewOff = () => {
	// 	const todoViewOff = this.context;
	// 	todoViewOff();
	// };
	
	render() {
		return (
			<TodoProvider viewkeyid={this.props.viewkeyid}>
				<div className="todo-template-block-fixed">
					<div className="todo-template-block">
						<TodoHead />
						<TodoList />
						<TodoCreate />
					</div>
				</div>
			</TodoProvider>
		);
	}
}

export default TodoTemplate;