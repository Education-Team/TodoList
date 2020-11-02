import React, {useContext} from 'react';
import './TodoHead.css';
import {TodoStateContext} from './TodoCardContext'
import { AllTodoViewOffContext } from '../todolist/AllTodoListContext'

const TodoHead = () => {
	const {keyid, date, todos} = useContext(TodoStateContext);
	const undoneTodos = todos && todos.filter(item => !item.done)
	
	const onViewOff = useContext(AllTodoViewOffContext);
	
	const today = new Date(date);
	const dateString = today.toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

	if(!todos) return <div>Loding...</div>;
	return (
		<div className="todo-head-block">
			<a className="toto-view-close" onClick={onViewOff}>X</a>
			<h1>{dateString}</h1>
			<div className="day">{dayName}, keyid={keyid}</div>
			<div className="tasks-left">할 일 - {undoneTodos.length}개</div>
		</div>
	);
};

export default TodoHead;