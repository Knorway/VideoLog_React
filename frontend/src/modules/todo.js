import { createAction, handleActions } from 'redux-actions';

export const changeTodo = createAction('todo/CHANGE', (text) => text);
export const addTodo = createAction('todo/ADD', (text) => ({
	id: Date.now(),
	text,
	done: false,
}));
export const removeTodo = createAction('todo/REMOVE', (id) => id);
export const toggleTodo = createAction('todo/TOGGLE', (id) => id);

const reducer = handleActions(
	{
		[changeTodo]: (state, { payload: text }) => ({ ...state, input: text }),
		[addTodo]: (state, { payload: todo }) => ({
			...state,
			todos: state.todos.concat(todo),
			input: '',
		}),
		[toggleTodo]: (state, { payload: id }) => ({
			...state,
			todos: state.todos.map((todo) =>
				todo.id === id ? { ...todo, done: !todo.done } : todo
			),
		}),
		[removeTodo]: (state, { payload: id }) => ({
			...state,
			todos: state.todos.filter((todo) => todo.id !== id),
		}),
	},
	{
		input: '',
		todos: [
			{ id: 1, text: '리덕스', done: false },
			{ id: 2, text: '리액트 어렵다', done: true },
		],
	}
);

export default reducer;
