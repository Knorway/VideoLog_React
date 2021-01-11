import { createAction, handleActions } from 'redux-actions';

export const increament = createAction('counter/INCREAMENT');
export const decreament = createAction('counter/DECREAMENT');

const counter = handleActions(
	{
		[increament]: (state, action) => ({ number: state.number + action.payload }),
		[decreament]: (state, action) => ({ number: state.number - action.payload }),
	},
	{ number: 0 }
);

export default counter;
