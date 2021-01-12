import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { setFormError, setFormLoading, setFormSuccess } from '../modules/authForm';

const FormsContainer = styled.div`
	display: flex;
	justify-content: center;
	form {
		display: flex;
		flex-direction: column;
		width: 70%;
		.github-btn {
			background-color: #555;
			color: #fff;
			border: none;
		}
	}
`;

const initialState = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const onChange = (setForm) => (e) => {
	setForm((prev) => ({
		...prev,
		[e.target.name]: e.target.value,
	}));
};

export const LoginForm = ({ dispatch, authForm }) => {
	const [form, setForm] = useState({ ...initialState });
	const historyTest = useHistory();

	const onSubmit = async (e) => {
		e.preventDefault();
		dispatch(setFormLoading());
		try {
			const { data } = await axios.post('/api/auth/login', form);
			dispatch(setFormSuccess(data));
		} catch (error) {
			dispatch(setFormError(error));
		}
		setForm(initialState);
		historyTest.push('/');
	};

	return (
		<FormsContainer>
			<form onSubmit={onSubmit}>
				<input
					type='text'
					placeholder='Email'
					name='email'
					value={form.email}
					onChange={onChange(setForm)}
				/>
				<input
					type='password'
					name='password'
					placeholder='Password'
					value={form.password}
					onChange={onChange(setForm)}
				/>
				<button>Login</button>
				<button className='github-btn'>Login with Github</button>
			</form>
		</FormsContainer>
	);
};

export const JoinForm = ({ dispatch, authForm }) => {
	const [form, setForm] = useState({ ...initialState });

	const onSubmit = async (e) => {
		e.preventDefault();
		dispatch(setFormLoading());
		try {
			const { data } = await axios.post('/api/auth/register', form);
			dispatch(setFormSuccess(data));
		} catch (error) {
			dispatch(setFormError(error));
		}
		setForm(initialState);
	};

	return (
		<FormsContainer>
			<form onSubmit={onSubmit}>
				<input
					type='text'
					placeholder='Name'
					name='name'
					value={form.name}
					onChange={onChange(setForm)}
				/>
				<input
					type='email'
					placeholder='Email'
					name='email'
					value={form.email}
					onChange={onChange(setForm)}
				/>
				<input
					type='password'
					placeholder='Password'
					name='password'
					value={form.password}
					onChange={onChange(setForm)}
				/>
				<input
					type='password'
					placeholder='Confirm your password'
					name='confirmPassword'
					value={form.confirmPassword}
					onChange={onChange(setForm)}
				/>
				<button>Join</button>
			</form>
		</FormsContainer>
	);
};

export const UploadForm = ({ dispatch, authForm }) => {
	return (
		<FormsContainer>
			<form>
				<label htmlFor='videoUploadInput'>video file</label>
				<input
					type='file'
					id='videoUploadInput'
					name='videoFile'
					accept='video/*'
					required='required'
				></input>
				<input type='text' placeholder='title' name='title' required='required' />
				<textarea
					name='description'
					placeholder='description'
					required='required'
				/>
				<button>Upload</button>
			</form>
		</FormsContainer>
	);
};
