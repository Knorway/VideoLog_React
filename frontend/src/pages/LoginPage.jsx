import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from '../components/Forms';

const LoginPage = ({ history }) => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo) {
			history.push('/');
		}
	}, [history, userInfo]);

	if (userInfo) return null;

	return <LoginForm dispatch={dispatch} history={history} />;
};

export default LoginPage;
