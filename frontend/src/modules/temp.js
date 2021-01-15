import { createAction, handleActions } from 'redux-actions';

export const setTemp = createAction('temp/SET');
export const resetTemp = createAction('temp/RESET');

const reducer = handleActions(
	{
		[setTemp]: (state, action) => ({
			data: action.payload,
		}),

		[resetTemp]: (state, action) => ({
			data: null,
		}),
	},
	{
		data: null,
	}
);

export default reducer;
