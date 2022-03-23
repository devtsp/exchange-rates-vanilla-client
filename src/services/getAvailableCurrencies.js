import { fetchAvailableCurrencies } from '../api/exchangerate-api.js';

export const getAvailableCurrencies = async () => {
	return fetchAvailableCurrencies();
};
