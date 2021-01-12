import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from '../components/Forms';

const LoginPage = ({ history }) => {
	const dispatch = useDispatch();

	// useEffect auth 인증용으로
	const authForm = useSelector((state) => state.authForm);

	return <LoginForm dispatch={dispatch} />;
};

export default LoginPage;
