const API_URL = 'https://v6.exchangerate-api.com/v6';
const KEY = '/ec7eec5e7967904472b9cf30';

export const fetchAvailableCurrencies = async () => {
	return await fetchApi(API_URL + KEY + '/codes');
};

export const fetchCurrenciesExchangeRates = async baseCurrency => {
	return await fetchApi(API_URL + KEY + '/latest/' + baseCurrency);
};

const fetchApi = async url => {
	const response = await fetch(url);
	if (!response.ok) {
		throw Error(response.status);
	}
	return response.json();
};
