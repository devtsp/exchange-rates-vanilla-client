import { fetchAvailableCurrencies } from '../api/exchangerate-api';

export const getAvailableCurrencies = async () => {
	return fetchAvailableCurrencies();
};
