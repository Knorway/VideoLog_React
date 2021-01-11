import { createAction, handleActions } from 'redux-actions';

const onChangeTodo = createAction('todo/ADD');
const addTodo = createAction('todo/ADD');
const toggleTodo = createAction('todo/ADD');
const removeTodo = createAction('todo/ADD');

const reducer = handleActions(
	{
		[onChangeTodo]: (state, action) => ({ ...state, input: action.payload }),
		[addTodo]: (state, action) => ({
			...state,
			todos: state.todos.concat(action.payload),
		}),
		[toggleTodo]: (state, action) => ({ ...state }),
		[removeTodo]: (state, action) => ({ state }),
	},
	{
		input: '',
		todos: [
			{ id: 1, text: '리덕스 기초 배우기', done: true },
			{ id: 2, text: '리액트와 리덕스 사용하기', done: false },
		],
	}
);

export default reducer;
