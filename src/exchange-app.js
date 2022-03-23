import { toggleLoading } from './ui/utils.js';
import { resetError, renderError } from './ui/errors.js';
import { getAvailableCurrencies } from './services/getAvailableCurrencies.js';
import { renderAvailableCurrenciesOptionLists } from './ui/available_currencies.js';
import { setBootstrapFormValidations } from './ui/form_validations.js';

const showAvailableCurrencies = async () => {
	resetError();
	toggleLoading();
	try {
		const availableCurrencies = await getAvailableCurrencies();
		renderAvailableCurrenciesOptionLists(availableCurrencies);
	} catch (error) {
		renderError(error);
	} finally {
		toggleLoading();
	}
};

// const showRates = async baseCurrency => {
// 	resetError();
// 	toggleLoading();
// 	try {
// 		const rates = await fetchApi(baseCurrency);
// 		renderRatesTable(rates);
// 	} catch (error) {
// 		renderError(error);
// 	} finally {
// 		toggleLoading();
// 	}
// };

// const showConversion = async (originCurrency, targetCurrency, amount) => {
// 	resetError();
// 	toggleLoading();
// 	try {
// 		const conversion = await fetchApi(baseCurrency);
// 		renderRatesTable(rates);
// 	} catch (error) {
// 		renderError(error);
// 	} finally {
// 		toggleLoading();
// 	}
// };

export const initExchangeApp = () => {
	setBootstrapFormValidations();
	showAvailableCurrencies();
};
