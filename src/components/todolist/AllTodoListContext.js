import React, { createContext, useReducer } from 'react';

const initialTodoListItems = [
	{
		keyid : 1,
		date: '2020-10-20',
		todos: [
			{
				id: 1,
				text: '투두리스트 만들기',
				done: false
			},
			{
				id: 2,
				text: '리액트 공부하기',
				done: true
			},
			{
				id: 3,
				text: 'REST API 구축하기',
				done: true
			},
		]
	},
	{
		keyid : 2,
		date: '2020-10-21',
		todos: [
			{
				id: 4,
				text: '투두리스트 메인페이지 만들기',
				done: true
			},
			{
				id: 5,
				text: 'Express 서버 공부하기',
				done: false
			},
			{
				id: 6,
				text: 'Dynamodb 공부하기',
				done: false
			},
		]
	},
	{
		keyid : 3,
		date: '2020-10-18',
		todos: [
			{
				id: 7,
				text: '테스트7',
				done: false
			}
		]
	},
	{
		keyid : 4,
		date: '2020-10-17',
		todos: [
			{
				id: 8,
				text: '테스트8',
				done: false
			}
		]
	}
];

function todoListReducer(state, action) {
	return state;
}

const AllTodoStateContext = createContext();
const AllTodoDispatchContext = createContext();
const AllTodoViewOffContext = createContext();

function TodoListProvider({ children, onViewOffEvent }) {
	const [listitem, dispatch] = useReducer(todoListReducer, initialTodoListItems);
	const todoViewOff = () => { onViewOffEvent(null); };	// AllTodoListTemplate의 자세히보기(TodoTemplate)컴포넌트를 없애게하는 이벤트

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