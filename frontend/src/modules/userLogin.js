import { createAction, handleActions } from 'redux-actions';

export const setUserLogin = createAction('userLogin/SUCCESS');
export const setUserLogout = createAction('userLogin/RESET');

const reducer = handleActions(
	{
		[setUserLogin]: (state, action) => ({
			userInfo: action.payload.user,
		}),

		[setUserLogout]: (state, action) => ({
			userInfo: null,
		}),
	},
	{
		userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
	}
);

export default reducer;
