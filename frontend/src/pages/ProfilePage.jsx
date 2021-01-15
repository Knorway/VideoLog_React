import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProfilePage = ({ history, match }) => {
	const { id } = match.params;
	const { userInfo } = useSelector((state) => state.userLogin);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!userInfo && !id) {
			history.push('/');
		}
	}, [dispatch, history, id, userInfo]);

	return (
		<>
			{userInfo && !id && (
				<div>
					<h1>{userInfo.name}</h1>
					<h4>{userInfo.email}</h4>
				</div>
			)}
			{id && <h1>{id}</h1>}
		</>
	);
};

export default ProfilePage;
