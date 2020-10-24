import React, {createContext, useReducer, useRef, useContext, useEffect} from 'react';
import { getTodo } from '../api';

const initialTodoItems = {
	// keyid : 0,
	// date: '',
	// todos: [
	// 	{
	// 		id: 0,
	// 		text: '',
	// 		done: false
	// 	}
	// ]
};


function todoReducer(state, action) {
	switch(action.type) {
		case 'INIT':	// TodoProvider 첫 마운트 시 찾은 데이터로 데이터 넣기
			return {
				...action.data,
				todos : action.data.todos.map( _item => ( {..._item} ))
			};
		case 'CREATE':
			return {
				...state,
				todos : state.todos.concat(action.todo)
			};
		case 'TOGGLE':
			return {
				...state,
				todos : state.todos.map(item => (
					item.id === action.id ? {...item, done : !item.done} : item
				))
			};
		case 'REMOVE':
			return {
				...state,
				todos : state.todos.filter( item => item.id !== action.id )
			};
		default:
			return state;
	}
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

// provider 전용 컴포넌트 함수
function TodoProvider({children, viewkeyid}) {	
	const [state, dispatch] = useReducer(todoReducer, initialTodoItems);
	const nextId = useRef(4);		// 이거 동적으로 구현해야됨

	
	useEffect(() => {
		(async () => {
			try {
				const _data = await getTodo(viewkeyid);
				dispatch({ type: 'INIT', data : _data });
			} catch (err) {
				console.log('에러발생');
				console.log(err);
			}
		})(); //IIFE(즉시 실행 함수)
	}, []);
	
	return (
		<TodoStateContext.Provider value={state}>
			<TodoDispatchContext.Provider value={dispatch}>
				<TodoNextIdContext.Provider value={nextId}>
					{children}
				</TodoNextIdContext.Provider>
			</TodoDispatchContext.Provider>
		</TodoStateContext.Provider>
	);
	
}


export { TodoProvider, TodoStateContext, TodoDispatchContext, TodoNextIdContext };

