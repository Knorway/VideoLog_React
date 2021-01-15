import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JoinForm } from '../components/Forms';

const JoinPage = ({ history }) => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo) {
			history.push('/');
		}
	});

	if (userInfo) return null;

	return <JoinForm dispatch={dispatch} history={history} userLogin={userLogin} />;
};

export default JoinPage;
