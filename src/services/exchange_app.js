import {
	fetchAvailableCurrencies,
	fetchCurrenciesExchangeRates,
} from '../api/exchangerate-api.js';

export const getAvailableCurrencies = async () => {
	return fetchAvailableCurrencies();
};

export const getCurrenciesExchangeRates = async baseCurrency => {
	return fetchCurrenciesExchangeRates(baseCurrency);
};
