import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const VideoListGrid = styled.div`
	display: grid;
	max-width: 100%;
	grid-template-columns: repeat(3, 300px);
	justify-content: center;
	gap: 8px;
	@media (max-width: 1024px) {
		grid-template-columns: repeat(auto-fit, 300px);
	}
	@media (max-width: 777px) {
		grid-template-columns: minmax(300px, 1fr);
	}
	.card-container {
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		overflow: hidden;
		.card-title {
			font-weight: 100;
		}
		video {
			width: 100%;
			height: 300px;
			object-fit: cover;
		}
		em {
			font-size: 12px;
		}
		.card-summary {
			padding: 12px;
			.card-postedAt {
				display: inline-block;
				margin-right: 5px;
			}
			.card-dateicon {
				width: 13px;
				height: 13px;
				vertical-align: text-top;
			}
			.card-creator {
				/* color: #5c7cfa; */
				text-decoration: none;
				font-style: normal;
				font-size: 14px;
				font-weight: 100;
			}
		}
	}
`;

const VideoList = ({ videos }) => {
	const { userInfo } = useSelector((state) => state.userLogin);

	return (
		<VideoListGrid>
			{videos.map((video) => (
				<div key={video._id} className='card-container'>
					<Link to={`/videos/${video._id}`}>
						<video key={video._id}>
							<source src={video.fileUrl} />
						</video>
					</Link>
					<div className='card-summary'>
						<h5 className='card-title'>{video.title}</h5>
						<em className='card-postedAt'>Posted at</em>
						<em>{video.createdAt.substring(0, 10)}</em>
						<em> by</em>
						<Link
							to={
								video.creator?._id === userInfo?.id
									? `/profile`
									: `/users/${video.creator?._id}`
							}
							className='card-creator'
						>
							<em className='card-creator'> {video.creator?.name}</em>
						</Link>
					</div>
				</div>
			))}
		</VideoListGrid>
	);
};

export default VideoList;
