import { useEffect } from 'react';
import VideoList from '../components/VideoList';

const HomePage = () => {
	useEffect(() => {
		fetch('/test')
			.then((res) => res.json())
			.then((data) => console.log(data));
	}, []);

	return (
		<>
			<VideoList />
		</>
	);
};

export default HomePage;
