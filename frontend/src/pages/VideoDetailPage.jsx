import { useEffect } from 'react';
import VideoDetail from '../components/VideoDetail';
import Loader from '../components/Loader';
import CommentsList from '../components/CommentsList';
import axios from 'axios';
import useFetch from '../utils/useFetch';

const VideoDetailPage = ({ match, history }) => {
	const id = match.params.id;
	const [loading, video, error, fetchData] = useFetch(async () => {
		const { data } = await axios.get(`/api/videos/${id}`);
		return data;
	});

	useEffect(() => {
		fetchData();
		//eslint-disable-next-line
	}, []);

	if (!video) return <Loader />;

	return (
		<>
			<VideoDetail video={video} />
			<CommentsList comments={video.comments} videoId={id} refetch={fetchData} />
		</>
	);
};

export default VideoDetailPage;
