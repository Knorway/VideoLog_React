import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const VideoDetailContainer = styled.div`
	.videoContainer {
		display: flex;
		justify-content: center;
		video {
			max-width: 100%;
			max-height: 600px;
			/* max-height: 700px; */
			outline: none;
		}
	}
`;

const VideoDetail = ({ video }) => {
	const { userInfo } = useSelector((state) => state.userLogin);
	const isCreator = userInfo?.id === video.creator._id;

	console.log(video);

	return (
		<VideoDetailContainer>
			<div className='videoContainer'>
				<video key={video._id} controls>
					<source src={video.fileUrl} />
				</video>
			</div>
			<div>
				<h5>{video.title}</h5>
				<Link
					to={
						video.creator._id === userInfo?.id
							? `/profile`
							: `/users/${video.creator._id}`
					}
				>
					{video.creator.name}
				</Link>
				<p>{video.creator.email}</p>
				{isCreator && (
					<Link to={`/videos/${video._id}/edit`}>
						<button>Edit Video</button>
					</Link>
				)}
				<hr />
				<h6>{video.description}</h6>
			</div>
		</VideoDetailContainer>
	);
};

export default VideoDetail;
