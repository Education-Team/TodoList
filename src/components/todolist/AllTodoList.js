import React, { useContext } from 'react';
import './AllTodoList.css';
import AllTodoItem from './AllTodoItem';
import { AllTodoStateContext } from './AllTodoListContext';

const AllTodoList = (props) => {
	const listTodos = useContext(AllTodoStateContext);

	const onClick = (keyid) => {

		props.onClickView({ keyid });
	};

	return (
		<div className="all-todo-list-block">
			<ul className="todo-list">
				{
					listTodos.map((item) => (
						<li
							className="todo-list-item"
							key={item.keyid}
							onClick={() => { onClick(item.keyid); }}
						>
							<div className="item-data">
								<div className="item-data-head">
									<h4 className="head-date">{item.date}</h4>
								</div>
								<AllTodoItem todos={item.todos} />
							</div>
						</li>
					))
				}
			</ul>
		</div>
	);
};

export default AllTodoList;