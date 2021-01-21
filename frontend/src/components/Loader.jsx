import styled from 'styled-components';

const LoaderContainer = styled.div`
	width: 100%;
	position: relative;
	z-index: 9;
	img {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, 50%);
	}
`;

const Loader = () => {
	return (
		<LoaderContainer>
			<img
				src='/images/YrMx-Spin-1s-200px.gif'
				alt='loader'
				style={{ width: '100px', height: '100px' }}
			/>
		</LoaderContainer>
	);
};

export default Loader;
