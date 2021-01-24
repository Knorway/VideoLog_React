import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const VideoDetailContainer = styled.div`
	.videoContainer {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
		video {
			max-width: 100%;
			max-height: 700px;
			outline: none;
		}
	}
	.video-title {
		font-weight: 100;
	}
	.video-description {
		font-weight: 100;
	}
`;

const VideoDetail = ({ video }) => {
	const { userInfo } = useSelector((state) => state.userLogin);
	const isCreator = userInfo?.id === video.creator._id;

	return (
		<VideoDetailContainer>
			<div className='videoContainer'>
				<video key={video._id} controls>
					<source src={video.fileUrl} />
				</video>
			</div>
			<div>
				<h5 className='video-title'>{video.title}</h5>
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
						<button>비디오 수정하기</button>
					</Link>
				)}
				<hr />
				<h6 className='video-description'>{video.description}</h6>
			</div>
		</VideoDetailContainer>
	);
};

export default VideoDetail;
