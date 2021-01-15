import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { setUserLogin } from '../modules/userLogin';
import { useForms } from '../utils/useForms';
import useAsync from '../utils/useAsync';
import Loader from './Loader';
import useFetch from '../utils/useFetch';

const FormsContainer = styled.div`
	display: flex;
	justify-content: center;
	.form-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	form {
		display: flex;
		flex-direction: column;
		width: 70%;
		margin-bottom: 0;
		small {
			color: tomato;
			margin-bottom: 15px;
		}
	}
	.github-btn {
		width: 70%;
		background-color: #555;
		color: #fff;
		border: none;
	}
`;

const initialState = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
	title: '',
	description: '',
	videoFile: '',
};

// -----------------------------Forms----------------------------#

export const LoginForm = ({ dispatch, history }) => {
	const [form, onChange, resetForm] = useForms(initialState);

	const [loading, data, error, fetchData] = useFetch(
		async () => {
			const { data } = await axios.post('/api/auth/login', form);
			return data;
		},
		(data) => {
			dispatch(setUserLogin(data));
			localStorage.setItem('userInfo', JSON.stringify(data.user));
		}
	);

	const onSubmit = (e) => {
		e.preventDefault();
		fetchData();
		resetForm();
	};

	return (
		<>
			{loading && <Loader />}
			<FormsContainer>
				<div className='form-container'>
					<em>Demo ID here</em>
					<form onSubmit={onSubmit}>
						<input
							type='text'
							placeholder='Email'
							name='email'
							value={form.email}
							onChange={onChange}
							required
						/>
						<input
							type='password'
							name='password'
							placeholder='Password'
							value={form.password}
							onChange={onChange}
							required
						/>
						{error && <small>Please check you account or password</small>}
						<button className='button button-primary'>Login</button>
					</form>
				</div>
			</FormsContainer>
		</>
	);
};

export const JoinForm = ({ dispatch, userLogin, history }) => {
	const [form, onChange, resetForm] = useForms(initialState);
	const [state, REQUEST, SUCCESS, FAILURE] = useAsync();
	const { loading, data, error } = state;

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			REQUEST();
			const { data } = await axios.post('/api/auth/register', form);
			SUCCESS(data);
			dispatch(setUserLogin(data));

			localStorage.setItem('userInfo', JSON.stringify(data.user));
			history.push('/');
		} catch (error) {
			FAILURE(error);
			resetForm();
		}
	};

	return (
		<>
			{loading && <Loader />}
			<FormsContainer>
				<form onSubmit={onSubmit}>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={form.name}
						onChange={onChange}
						required
					/>
					<input
						type='email'
						placeholder='Email'
						name='email'
						value={form.email}
						onChange={onChange}
						required
					/>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={form.password}
						onChange={onChange}
						required
					/>
					<input
						type='password'
						placeholder='Confirm your password'
						name='confirmPassword'
						value={form.confirmPassword}
						onChange={onChange}
						required
					/>
					{error && <small>Please check you account or password</small>}
					<button className='button-primary'>Join</button>
				</form>
			</FormsContainer>
		</>
	);
};

export const UploadForm = ({ dispatch, userLogin }) => {
	const [form, onChange] = useForms(initialState);
	const history = useHistory();

	// useAsync refactoring
	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('videoFile', form.videoFile);
		formData.append('form', JSON.stringify(form));

		const { data: video } = await axios.post('/api/videos', formData);
		history.push(`/videos/${video.id}`);
	};

	return (
		<FormsContainer>
			<form onSubmit={onSubmit}>
				<label htmlFor='videoUploadInput'>video file</label>
				<input
					type='file'
					id='videoUploadInput'
					name='videoFile'
					accept='video/*'
					required
					onChange={onChange}
				></input>
				<input
					type='text'
					placeholder='title'
					name='title'
					required
					onChange={onChange}
				/>
				<textarea
					name='description'
					placeholder='description'
					required
					onChange={onChange}
				/>
				<button>Upload</button>
			</form>
		</FormsContainer>
	);
};

export const EditForm = ({ history, dispatch, userLogin, id }) => {
	const [form, onChange] = useForms(initialState);

	// useAsync ?
	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.put(`/api/videos/${id}`, form);
		history.push(`/videos/${id}`);
	};

	const onDelete = async (e) => {
		e.preventDefault();
		if (window.confirm('are you sure to delete this video?')) {
			await axios.delete(`/api/videos/${id}`);
			history.push('/');
		}
	};

	return (
		<FormsContainer>
			<form onSubmit={onSubmit}>
				<h4>Edit Video</h4>
				<input
					type='text'
					placeholder='title'
					name='title'
					required
					onChange={onChange}
				/>
				<textarea
					name='description'
					placeholder='description'
					required
					onChange={onChange}
				/>
				<button>Upload</button>
				<button className='button-danger' onClick={onDelete}>
					Delete
				</button>
			</form>
		</FormsContainer>
	);
};
