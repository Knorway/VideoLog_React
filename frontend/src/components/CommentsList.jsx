import styled from 'styled-components';
import axios from 'axios';
import { useForms } from '../utils/useForms';
import useAsync from '../utils/useAsync';
import Loader from './Loader';

const CommentsListContainer = styled.div`
	ul {
		list-style: none;
	}
`;

const CommentContainer = styled.span``;

const initialState = { comment: '' };

const Comment = ({ comment }) => {
	return (
		<CommentContainer>
			<li className='comment-item'>
				{/* <i
					className='far fa-times-circle delete-icon'
					data-src='{{comment.id}}'
				></i> */}
				<p>{comment.text}</p>
			</li>
		</CommentContainer>
	);
};

const CommentsList = ({ id, comments, refetch }) => {
	const [form, onChange, reset] = useForms(initialState);
	const [state, REQUEST, SUCCESS] = useAsync();
	const { loading } = state;

	// try/catch
	const onsubmit = async (e) => {
		e.preventDefault();

		REQUEST();
		await axios.post(`/api/videos/${id}/comments`, form);
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
				<ul id='comment-list'>
					{comments.map((comment) => (
						<Comment key={comment._id} comment={comment} />
					))}
				</ul>
			</CommentsListContainer>
		</>
	);
};

export default CommentsList;
