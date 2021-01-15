import { combineReducers } from 'redux';
import userLogin from './userLogin';
import temp from './temp';

const rootReducer = combineReducers({
	userLogin,
	temp,
});

export default rootReducer;
