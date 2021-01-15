import { useEffect } from 'react';
import Loader from '../components/Loader';
import VideoList from '../components/VideoList';
import useFetch from '../utils/useFetch';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SearchPage = ({ match }) => {
	const { keyword } = match.params;
	const temp = useSelector((state) => state.temp.data);

	const [loading, videos, error, fetchData] = useFetch(async () => {
		const { data } = await axios.get(`/api/videos?keyword=${keyword}`);
		return data;
	});

	useEffect(() => {
		fetchData();
		//eslint-disable-next-line
	}, [temp]);

	if (loading) return <Loader />;
	if (!videos) return null;

	return (
		<>
			<h3
				style={{ paddingLeft: '2rem' }}
			>{`Search Result for Keyword: ${keyword}`}</h3>
			<VideoList videos={videos} />
		</>
	);
};

export default SearchPage;
