import React, { createContext, useReducer, useEffect } from 'react';
import { getTodos } from '../api'

const initialTodoListItems = [
	// {
	// 	keyid : 1,
	// 	date: '2020-10-20',
	// 	todos: [
	// 		{
	// 			id: 1,
	// 			text: '투두리스트 만들기',
	// 			done: false
	// 		},
	// 		{
	// 			id: 2,
	// 			text: '리액트 공부하기',
	// 			done: true
	// 		},
	// 		{
	// 			id: 3,
	// 			text: 'REST API 구축하기',
	// 			done: true
	// 		},
	// 	]
	// }
];


function todoListReducer(state, action) {
	switch (action.type) {
		case 'INIT':
			return action.data;
	}
	return state;
}

const AllTodoStateContext = createContext();
const AllTodoDispatchContext = createContext();
const AllTodoViewOffContext = createContext();

function TodoListProvider({ children, onViewOffEvent }) {
	const [listitem, dispatch] = useReducer(todoListReducer, initialTodoListItems);
	const todoViewOff = () => { 
		initfetchTodos();
		onViewOffEvent(null); 
	};	// AllTodoListTemplate의 자세히보기(TodoTemplate)컴포넌트를 없애게하는 이벤트
	
	const initfetchTodos = async () => {
		try {
			const _data = await getTodos();
			dispatch({type : "INIT", data : _data});
		}
		catch(err) {
			console.log("에러발생");
			console.log(err);
		}
	}
	useEffect(()=>{
		initfetchTodos();
	},[]);

	return (
		<AllTodoStateContext.Provider value={listitem}>
			<AllTodoDispatchContext.Provider value={dispatch}>
				<AllTodoViewOffContext.Provider value={todoViewOff}>
					{children}
				</AllTodoViewOffContext.Provider>
			</AllTodoDispatchContext.Provider>
		</AllTodoStateContext.Provider>
	);
}

export { TodoListProvider, AllTodoStateContext, AllTodoDispatchContext, AllTodoViewOffContext };