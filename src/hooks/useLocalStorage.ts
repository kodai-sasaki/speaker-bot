import { useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
	const get = () => {
		try {
			const value = window.localStorage.getItem(key);
			if (value) {
				return JSON.parse(value);
			}
			return initialValue;
		} catch (_) {
			return initialValue;
		}
	};
	const [storedValue, setStoredValue] = useState<T>(get());
	const setValue = (value: T) => {
		try {
			setStoredValue(value);
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (e) {
			console.error(e);
		}
	};
	return [storedValue, setValue] as const;
};
