export const setExchangeRatesHandler = showExchangeRates => {
	document.querySelector('#exchange-rates form').onsubmit = e => {
		e.preventDefault();
		const baseCurrency = e.target.base.value;
		showExchangeRates(baseCurrency);
	};
};
