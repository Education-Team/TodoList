import React, {useContext, useState} from 'react';
import './TodoCreate.css';
import {TodoNextIdContext, TodoDispatchContext} from './TodoCardContext';


const TodoCreate = () => {
	
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const nextId = useContext(TodoNextIdContext);
	const dispatch = useContext(TodoDispatchContext);
	
	const onChange = (e) => setInputValue(event.target.value)
	const onSubmit = (e) => {
		e.preventDefault(); // 새로고침 방지
		dispatch({
			type : 'CREATE',
			todo : {
				id: nextId.current++,		// 넣은 후 더하기
				text: inputValue,
				done: false,
			}
		});
		setInputValue('');
		setOpen(false);
	}
	const onToggle = () => setOpen((state) => !state);
	
	const toggleOnStyle = "todo-create-button-toggle-on"
	
	return (
		<>
			{open && (
			<div className="todo-create-insert-block">
				<form className="todo-create-insert-form" onSubmit={onSubmit}>
					<input 
						className="todo-create-insert-input"  
						placeholder="할 일을 입력 후, Enter 를 누르세요"
						autoFocus
						value={inputValue}
						onChange={onChange}
					/>
				</form>
			</div>
			)}
			<button className={`todo-create-button ${open && toggleOnStyle}`} onClick={onToggle}>+</button>
		</>
	);
}

export default TodoCreate;