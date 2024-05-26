import { useEffect, useState } from 'react';

export default function useDebounceValue<T>(defaultValue: T, delay: number = 500): T {
	const [debouncedValue, setDebouncedValue] = useState(defaultValue);
	useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedValue(defaultValue);
		}, delay);

		return () => {
			clearTimeout(id);
		};
	}, [defaultValue, delay]);

	return debouncedValue;
}
