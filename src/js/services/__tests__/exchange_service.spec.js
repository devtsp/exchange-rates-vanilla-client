import {
	getAvailableCurrencies,
	getCurrenciesExchangeRates,
	getPairConversion,
} from '../exchange_service';

import {
	fetchAvailableCurrencies,
	fetchCurrenciesExchangeRates,
	fetchPairConversion,
} from '../../api/exchangerate-api.js';

jest.mock('../../api/exchangerate-api.js', () => {
	return {
		__esModule: true,
		fetchAvailableCurrencies: jest.fn(),
		fetchCurrenciesExchangeRates: jest.fn(),
		fetchPairConversion: jest.fn(),
	};
});

const API_URL = 'https://v6.exchangerate-api.com/v6';
const KEY = 'ec7eec5e7967904472b9cf30';

describe('Available codes', () => {
	test('getAvailableCodes', () => {
		getAvailableCurrencies();
		1;
		expect(fetchAvailableCurrencies).toHaveBeenCalled();
	});
});

describe('Exchange rates', () => {
	test('getCurrenciesExchangeRates', () => {
		getCurrenciesExchangeRates('test');
		expect(fetchCurrenciesExchangeRates).toHaveBeenCalledWith('test');
	});
});

describe('Pair conversion', () => {
	test('getPairConversion', () => {
		getPairConversion(1, 'USD', 'ARS');
		1;
		expect(fetchPairConversion).toHaveBeenCalledWith(1, 'USD', 'ARS');
	});
});
