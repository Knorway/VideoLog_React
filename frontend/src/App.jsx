import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import { decreament, increament } from './modules/counter';

const todoItem = () => {
	return (
		<div>
			<h4>todo</h4>
			<h4>X</h4>
		</div>
	);
};

const App = () => {
	const dispatch = useDispatch();
	const counter = useSelector((state) => state.todo);

	return (
		<div>
			<form>
				<input type='text' placeholder='todo here' />
				<button>submit</button>
			</form>
		</div>
	);
};

export default App;
