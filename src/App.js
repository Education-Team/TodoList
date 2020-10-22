import React, { Component } from 'react';
import TodoTemplate from './components/todocard/TodoTemplate';
import AllTodoListTemplate from './components/todolist/AllTodoListTemplate'

class App extends Component {

	
	render() {
		const styleContainer = {
			width: '100%',
			height: '100%',
			position: 'absolute'
		}
		
		return (
			<div className='container' style={styleContainer}>
				<AllTodoListTemplate/>
			</div>
			//<TodoTemplate/>
		);
	}
	
}

export default App;