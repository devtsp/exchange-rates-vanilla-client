import { toggleLoading } from './ui/utils.js';
import { resetError, renderError } from './ui/errors.js';
import {
	getAvailableCurrencies,
	getCurrenciesExchangeRates,
	getPairConversion,
} from './services/exchange_service.js';
import { renderAvailableCurrenciesOptionLists } from './js/ui/available_currencies.js.js';
import { setBootstrapFormValidations } from './js/ui/form_validations.js.js';
import {
	setExchangeRatesHandler,
	setPairConversionHandler,
} from './ui/set_handlers.js';
import { renderExchangeRatesTable } from './ui/exchange_rates.js';
import { renderPairConversionCard } from './ui/pair_conversion.js';

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

const showPairConversion = async (amount, originCurrency, targetCurrency) => {
	resetError();
	toggleLoading();
	try {
		const { base_code, target_code, conversion_result } =
			await getPairConversion(amount, originCurrency, targetCurrency);
		renderPairConversionCard({ base_code, target_code, conversion_result });
	} catch (error) {
		renderError(error);
	} finally {
		toggleLoading();
	}
};

export const initExchangeApp = () => {
	setBootstrapFormValidations();
	showAvailableCurrencies();
	setExchangeRatesHandler(showExchangeRates);
	setPairConversionHandler(showPairConversion);
};
