import { useState } from 'react';

const useFetch = (promiseFn, callback) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);

	const fetchData = async () => {
		setLoading(true);

		try {
			const response = await promiseFn();
			setData(response);
			setLoading(false);
			callback(response);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	return [loading, data, error, fetchData];
};

export default useFetch;
