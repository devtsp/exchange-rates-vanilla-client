import { toggleLoading } from './ui/utils.js';
import { resetError, renderError } from './ui/errors.js';

import { getAvailableCurrencies } from './services/getAvailableCurrencies.js';
import { fetchApi } from './api/exchangerate-api.js';

const getAvailableCurrencies = () => {
	resetError();
	toggleLoading();
	try {
		const availableCurrencies = await getAvailableCurrencies();
		renderRatesTable(availableCurrencies);
	} catch (error) {
		renderError(error);
	} finally {
		toggleLoading();
	}
};

const showRates = async baseCurrency => {
	resetError();
	toggleLoading();
	try {
		const rates = await fetchApi(baseCurrency);
		renderRatesTable(rates);
	} catch (error) {
		renderError(error);
	} finally {
		toggleLoading();
	}
};

const showConversion = async (originCurrency, targetCurrency, amount) => {
	resetError();
	toggleLoading();
	try {
		const conversion = await fetchApi(baseCurrency);
		renderRatesTable(rates);
	} catch (error) {
		renderError(error);
	} finally {
		toggleLoading();
	}
};

export const initExchangeApp = () => {};
