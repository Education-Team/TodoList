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
	const nextId = useRef(0);		// 그 다음 todo리스트 추가할 id값
	
	useEffect(() => {
		(async () => {
			try {
				const _data = await getTodo(viewkeyid);
				dispatch({ type: 'INIT', data : _data });
				// todos중에 제일큰 id값 찾기
				const refKeyNumber = _data.todos.reduce((accObject, currentObject) => {
					return accObject.id > currentObject.id ? accObject.id : currentObject.id;
				},0);
				nextId.current = refKeyNumber;	// 제일 큰 id 번호
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

