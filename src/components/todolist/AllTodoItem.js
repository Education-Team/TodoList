import React, { useContext } from 'react';
import './AllTodoItem.css';

const AllTodoItem = (props) => {
	const todos = props.todos;

	return (
		<div className="item-list-todos">
			{
				todos.map(item => (
					<div className={item.done ? 'item-done' : ''} key={item.id}>{item.text}</div>
				))
			}
		</div>
	);
};

export default AllTodoItem;
