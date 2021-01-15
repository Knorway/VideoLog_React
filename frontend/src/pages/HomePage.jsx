import { useCallback, useEffect, useState } from 'react';
import VideoList from '../components/VideoList';
import axios from 'axios';
import Loader from '../components/Loader';
import useAsync from '../utils/useAsync';

const HomePage = () => {
	const [state, REQUEST, SUCCESS] = useAsync();
	const { loading, data: videos } = state;

	const fetctVideos = useCallback(async () => {
		REQUEST();
		const { data } = await axios.get('/api/videos');
		SUCCESS(data);
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		fetctVideos();
	}, [fetctVideos]);

	if (loading) return <Loader />;
	if (!videos) return null;

	return (
		<>
			<VideoList videos={videos} />
		</>
	);
};

export default HomePage;
