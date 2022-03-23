import { toggleLoading } from './ui/utils.js';
import { resetError, renderError } from './ui/errors.js';
import {
	getAvailableCurrencies,
	getCurrenciesExchangeRates,
} from './services/exchange_app.js';
import { renderAvailableCurrenciesOptionLists } from './ui/available_currencies.js';
import { setBootstrapFormValidations } from './ui/form_validations.js';
import { setExchangeRatesHandler } from './ui/event_handlers.js';
import { renderExchangeRatesTable } from './ui/exchange_rates.js';

const showAvailableCurrencies = async () => {
	resetError();
	toggleLoading();
	try {
		const { supported_codes } = await getAvailableCurrencies();
		renderAvailableCurrenciesOptionLists(supported_codes);
	} catch (error) {
		renderError(error);
	} finally {
		toggleLoading();
	}
};

const showExchangeRates = async baseCurrency => {
	console.log(baseCurrency);
	resetError();
	toggleLoading();
	try {
		const { conversion_rates } = await getCurrenciesExchangeRates(baseCurrency);
		renderExchangeRatesTable(conversion_rates);
	} catch (error) {
		renderError(error);
	} finally {
		toggleLoading();
	}
};

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
	setExchangeRatesHandler(showExchangeRates);
};
