import { createAction, handleActions } from 'redux-actions';

export const setFormLoading = createAction('authForm/LOADING');
export const setFormSuccess = createAction('authForm/SUCCESS');
export const setFormError = createAction('authForm/ERROR');
export const setFormReset = createAction('authForm/RESET');

const reducer = handleActions(
	{
		[setFormLoading]: (state, action) => ({ loading: true, data: null, error: null }),
		[setFormSuccess]: (state, action) => ({
			loading: false,
			data: action.payload,
			error: null,
		}),
		[setFormError]: (state, action) => ({
			loading: false,
			data: null,
			error: action.payload,
		}),
		[setFormReset]: (state, action) => ({ loading: false, data: false, error: null }),
	},
	{
		loading: false,
		data: null,
		error: null,
	}
);

export default reducer;
