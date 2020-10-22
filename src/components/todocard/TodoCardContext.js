import React, {createContext, useReducer, useRef, useContext, useEffect} from 'react';
import { AllTodoStateContext } from '../todolist/AllTodoListContext'

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
				...action.todoitem,
				todos : action.todoitem.todos.map( _item => ( {..._item} ))
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
	
	const listitem = useContext(AllTodoStateContext);		// AllTodoListContext에서 상태 전체 투두리스트 데이터
	const todoitem = listitem.find(_item => _item.keyid === viewkeyid);	// listitem에서 viewkeyid의 키로 정보 데이터 찾기
	
	useEffect(() => {
		dispatch({type : 'INIT', todoitem});
	},[]);
	
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

