import { useCallback, useEffect, useState } from 'react';
import VideoDetail from '../components/VideoDetail';
import Loader from '../components/Loader';
import CommentsList from '../components/CommentsList';
import axios from 'axios';

const VideoDetailPage = ({ match, history }) => {
	const id = match.params.id;
	const [video, setVideo] = useState(null);

	const fetchVideo = useCallback(async () => {
		const { data: video } = await axios.get(`/api/videos/${id}`);
		setVideo(video);
	}, [id]);

	useEffect(() => {
		fetchVideo();
	}, [fetchVideo]);

	if (!video) return <Loader />;

	return (
		<>
			<VideoDetail video={video} />
			<CommentsList comments={video.comments} id={id} refetch={fetchVideo} />
		</>
	);
};

export default VideoDetailPage;
