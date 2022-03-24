import {
	fetchAvailableCurrencies,
	fetchCurrenciesExchangeRates,
	fetchPairConversion,
} from '../exchangerate-api.js';

const API_URL = 'https://v6.exchangerate-api.com/v6';
const KEY = 'ec7eec5e7967904472b9cf30';

global.fetch = jest.fn(
	() =>
		new Promise(res => res({ ok: true, json: () => new Promise(r => r({})) }))
);

describe('Available codes', () => {
	test('fetchAvailableCurrencies', () => {
		expect.assertions(1);
		return fetchAvailableCurrencies().then(_ => {
			expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/${KEY}/codes`);
		});
	});
});

describe('Exchange rates', () => {
	test('fetchCurrenciesExchangeRates', () => {
		expect.assertions(1);
		return fetchCurrenciesExchangeRates('TEST').then(_ => {
			expect(global.fetch).toHaveBeenCalledWith(
				`${API_URL}/${KEY}/latest/TEST`
			);
		});
	});
});

describe('Pair conversion', () => {
	test('fetchPairConversion', () => {
		expect.assertions(1);
		return fetchPairConversion(123, 'FOO', 'BAR').then(_ => {
			expect(global.fetch).toHaveBeenCalledWith(
				`${API_URL}/${KEY}/pair/FOO/BAR/123`
			);
		});
	});
});
