import { EditForm } from '../components/Forms';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const VideoEditPage = ({ history, match }) => {
	const { id } = match.params;
	const { userInfo } = useSelector((state) => state.userLogin);

	useEffect(() => {
		if (!userInfo) {
			history.push('/');
		}
	}, [history, id, userInfo]);

	if (!userInfo) return null;

	return <EditForm id={id} history={history} />;
};

export default VideoEditPage;
