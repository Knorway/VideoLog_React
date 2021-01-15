import styled from 'styled-components';
import axios from 'axios';
import { useForms } from '../utils/useForms';
import useAsync from '../utils/useAsync';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import useFetch from '../utils/useFetch';
import { useHistory } from 'react-router-dom';

const CommentsListContainer = styled.div`
	position: relative;
	min-height: 350px;
	ul {
		list-style: none;
	}
`;

const CommentContainer = styled.span`
	.delete-comment {
		cursor: pointer;
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
					<p>{comment.text}</p>
					{isCreator && (
						<p className='delete-comment' onClick={onDelete}>
							X
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
				<h5>comments</h5>
				<form id='commentInput' onSubmit={onsubmit}>
					<input
						type='text'
						name='comment'
						placeholder='add your comments'
						value={form.comment}
						onChange={onChange}
					/>
				</form>
				<ul className='comment-list'>
					{comments.map((comment) => (
						<Comment
							key={comment._id}
							comment={comment}
							userId={userInfo?.user?.id}
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
