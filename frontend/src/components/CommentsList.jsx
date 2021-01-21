import styled from 'styled-components';
import axios from 'axios';
import { useForms } from '../utils/useForms';
import useAsync from '../utils/useAsync';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import useFetch from '../utils/useFetch';
import { useHistory } from 'react-router-dom';

const CommentsListContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 350px;
	ul {
		list-style: none;
	}
	input {
		width: 320px;
		&::placeholder {
			text-align: center;
		}
	}
`;

const CommentContainer = styled.span`
	.comment-item {
		position: relative;
		width: 320px;
		background-color: #e9ecef;
		border-radius: 20px;
		border-bottom-right-radius: 0;
		padding: 15px 30px;
	}
	.comment-text {
		margin-bottom: 0;
		word-wrap: break-word;
		text-align: center;
	}
	.delete-comment {
		cursor: pointer;
		position: absolute;
		right: 2%;
		top: 35%;
		width: 15px;
		height: 15px;
		color: #868e96;
		padding-right: 0.5rem;
	}
`;

const initialState = { comment: '' };

const Comment = ({ comment, userId, videoId, refetch }) => {
	const isCreator = userId === comment.creator;
	const history = useHistory();

	const [loading, data, error, fetchData] = useFetch(
		async () => {
			await axios.delete(`/api/videos/${videoId}/comments`, {
				data: { commentId: comment._id },
			});
		},
		() => {
			history.push(`/videos/${videoId}`);
			refetch();
		}
	);

	const onDelete = async () => {
		if (window.confirm('are you sure to delete this comment?')) {
			fetchData();
		}
	};

	return (
		<>
			{loading && <Loader />}
			<CommentContainer>
				<li className='comment-item'>
					<p className='comment-text'>{comment.text}</p>
					{isCreator && (
						<p className='delete-comment' onClick={onDelete}>
							<svg
								className='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
								></path>
							</svg>
						</p>
					)}
				</li>
			</CommentContainer>
		</>
	);
};

const CommentsList = ({ videoId, comments, refetch }) => {
	const { userInfo } = useSelector((state) => state.userLogin);
	const [form, onChange, reset] = useForms(initialState);
	const [state, REQUEST, SUCCESS] = useAsync();
	const { loading } = state;

	// try/catch or useFetch
	const onsubmit = async (e) => {
		e.preventDefault();

		REQUEST();
		await axios.post(`/api/videos/${videoId}/comments`, form);
		SUCCESS();

		refetch();
		reset();
		// TODO: scroll down to bottom or sort -i
	};

	return (
		<>
			{loading && <Loader />}
			<CommentsListContainer>
				<h5>코멘트</h5>
				<form id='commentInput' onSubmit={onsubmit}>
					<input
						type='text'
						name='comment'
						placeholder='코멘트를 남겨주세요'
						value={form.comment}
						onChange={onChange}
					/>
				</form>
				<ul className='comment-list'>
					{comments.map((comment) => (
						<Comment
							key={comment._id}
							comment={comment}
							userId={userInfo?.id}
							videoId={videoId}
							refetch={refetch}
						/>
					))}
				</ul>
			</CommentsListContainer>
		</>
	);
};

export default CommentsList;
