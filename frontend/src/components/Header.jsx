import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogout } from '../modules/userLogin';
import SearchBox from './SearchBox';

const NavBar = styled.nav`
	display: flex;
	padding: 0 3rem;
	@media (max-width: 920px) {
		flex-direction: column-reverse;
		}
	}
	.logo {
		flex: 1;
		padding-top: 1rem;
		padding-left: 3rem;
		color: #000;
		text-decoration-line: none;
		@media (max-width: 920px) {
			order: 1;
			padding-right: 3rem;
			text-align: center;
			padding-top: 0;
			h5 {
				font-size: 24px;
			}
		}
	}
	.nav-items {
		flex: 1;
		padding-top: 1rem;
		text-align: center;
		display: flex;
		justify-content: center;
		button {
			color: #5c7cfa;
		}
		a:nth-child(1) {
  		margin-right: 3rem;
		}
		a:nth-child(2) {
  		margin-right: 3rem;
		}
	}
`;

function Header() {
	const { userInfo } = useSelector((state) => state.userLogin);
	const history = useHistory();
	const dispatch = useDispatch();

	const logoutHandler = async () => {
		await fetch('/api/auth/logout');
		dispatch(setUserLogout());
		localStorage.removeItem('userInfo');
		history.push('/');
	};

	return (
		<NavBar>
			<Link to='/' className='logo'>
				<h5>VideoLog</h5>
			</Link>
			<SearchBox history={history} />
			<div className='nav-items'>
				{!userInfo && (
					<>
						<Link to='/join'>
							<button>가입</button>
						</Link>
						<Link to='/login'>
							<button>로그인</button>
						</Link>
					</>
				)}
				{userInfo && (
					<>
						<Link to='/upload'>
							<button>업로드</button>
						</Link>
						<Link to='/profile'>
							<button>프로파일</button>
						</Link>
						<button onClick={logoutHandler}>로그아웃</button>
					</>
				)}
			</div>
		</NavBar>
	);
}

export default Header;
