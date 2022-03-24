import {
	fetchAvailableCurrencies,
	fetchCurrenciesExchangeRates,
	fetchPairConversion,
} from '../api/exchangerate-api.js';

export const getAvailableCurrencies = async () => {
	return fetchAvailableCurrencies();
};

export const getCurrenciesExchangeRates = async baseCurrency => {
	return fetchCurrenciesExchangeRates(baseCurrency);
};

export const getPairConversion = async (amount, origin, target) => {
	return fetchPairConversion(amount, origin, target);
};
