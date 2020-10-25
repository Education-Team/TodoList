import React, { useContext } from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';
import { TodoStateContext } from './TodoCardContext';

const TodoList = () => {
	const { keyid, todos } = useContext(TodoStateContext);
	return (
		<div className="todo-list-block">
			{
				todos &&
					todos.map((item) => (
						<TodoItem key={item.id} keyid={keyid} id={item.id} text={item.text} done={item.done} />
					))
			}
		</div>
	);
};

export default TodoList;