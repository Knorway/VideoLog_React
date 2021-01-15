import { useState } from 'react';

export const useForms = (initialState) => {
	const [form, setForm] = useState(initialState);

	const onChange = (e) => {
		const { name, value, files } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: (files && files[0]) || value,
		}));
	};

	const reset = () => setForm(initialState);

	return [form, onChange, reset];
};
