import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UploadForm } from '../components/Forms';
import VideoRecorder from '../components/VideoRecorder';

const UploadPage = () => {
	const history = useHistory();
	const userLogin = useSelector((state) => state.userLogin);

	useEffect(() => {
		if (!userLogin.userInfo) {
			history.push('/');
		}
	});

	if (!userLogin) return null;

	return (
		<>
			<VideoRecorder />
			<UploadForm />
		</>
	);
};

export default UploadPage;
