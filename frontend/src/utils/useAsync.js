import { useReducer } from 'react';
import { createAction, handleActions } from 'redux-actions';

const setLoading = createAction('LOADING');
const setData = createAction('SUCCESS');
const setError = createAction('ERROR');

const initialState = {
	loading: false,
	data: null,
	error: null,
};

const reducer = handleActions(
	{
		[setLoading]: (state, action) => ({
			loading: true,
			data: null,
			error: null,
		}),
		[setData]: (state, action) => ({
			loading: false,
			data: action.payload,
			error: null,
		}),
		[setError]: (state, action) => ({
			loading: false,
			data: null,
			error: action.payload,
		}),
	},
	initialState
);

const useAsync = () => {
	const [state, dispatch] = useReducer(reducer, { ...initialState });
	const request = () => dispatch(setLoading());
	const success = (data) => dispatch(setData(data));
	const failure = (error) => dispatch(setError(error));

	return [state, request, success, failure];
};

export default useAsync;
