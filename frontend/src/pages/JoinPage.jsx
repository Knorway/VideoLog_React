import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JoinForm } from '../components/Forms';

const JoinPage = ({ history }) => {
	const dispatch = useDispatch();
	const { data } = useSelector((state) => state.authForm);

	return <JoinForm dispatch={dispatch} />;
};

export default JoinPage;
