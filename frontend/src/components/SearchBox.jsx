import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setTemp } from '../modules/temp';

const SearchBoxContainer = styled.form`
	flex: 1;
	margin-top: 1rem;
	width: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	input {
		width: 90%;
	}
	@media (max-width: 920px) {
		margin-bottom: 0;
		width: 100%;
		margin-bottom: 3rem;
		input {
			width: 80%;
		}
	}
`;

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('');
	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();

		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
			dispatch(setTemp(keyword));
		} else {
			history.push('/');
		}
	};

	return (
		<SearchBoxContainer onSubmit={onSubmit}>
			<input
				type='text'
				placeholder='검색'
				onChange={(e) => setKeyword(e.target.value)}
				value={keyword}
			/>
		</SearchBoxContainer>
	);
};

export default SearchBox;
