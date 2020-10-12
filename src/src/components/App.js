import React, { Component } from 'react';

class App extends Component {
	
	state = {
		value : 1
	}
	
	render() {
		return (
			<div>
				hello {this.state.value}
			</div>
		);
	}
	
}

export default App;