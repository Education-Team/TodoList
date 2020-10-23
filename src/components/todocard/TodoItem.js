import React, {useContext} from 'react';
import './TodoItem.css';
import {TodoDispatchContext} from './TodoCardContext'

const TodoItem = ({id, text, done}) => {
	
	const _checkDoneStyle = {
		border: "1px solid #38d9a9",
		color: "#38d9a9"
	}
	
	const _textDoneStyle = {
		color: "#ced4da"
	}
	
	const dispatch = useContext(TodoDispatchContext);
	const onToggle = () => dispatch({type : 'TOGGLE', id});
	const onRemove = () => dispatch({type : 'REMOVE', id});
	
	return (
		<div className="todo-item-block" >
			<div className="todo-item-check" style={done ? _checkDoneStyle : null} onClick={onToggle}>{done && "V"}</div>
			<div className="todo-item-text" style={done ? _textDoneStyle : null}>{text}, id={id}</div>
			<div className="todo-item-remove" onClick={onRemove}>X</div>
		</div>

	);
	
}

export default TodoItem;