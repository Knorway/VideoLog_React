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
		video {
			width: 100%;
			height: 300px;
			object-fit: cover;
		}
		.card-summary {
			padding: 12px;
			em {
				font-size: 12px;
			}
			.card-date-icon {
				color: darkgray;
				font-size: 12px;
				margin-right: 3px;
			}
			.card-views-info {
				.card-view-icon {
					color: darkgray;
					font-size: 11px;
					margin-left: 6px;
				}
				em {
					margin-left: 2px;
					color: darkgray;
					font-size: 11px;
				}
			}
		}
	}
`;

const VideoList = ({ videos }) => {
	return (
		<VideoListGrid>
			{videos.map((video) => (
				<div key={video._id} className='card-container'>
					<Link to={`/videos/${video._id}`}>
						<video key={video._id}>
							<source src={video.fileUrl} />
						</video>
					</Link>
					<h4 className='card-summary'>{video.title}</h4>
				</div>
			))}
		</VideoListGrid>
	);
};

export default VideoList;
