export const setExchangeRatesHandler = showExchangeRates => {
	document.querySelector('#exchange-rates form').onsubmit = e => {
		e.preventDefault();
		const baseCurrency = e.target.base.value;
		showExchangeRates(baseCurrency);
	};
};

export const setPairConversionHandler = showPairConversion => {
	document.querySelector('#pair-conversion form').onsubmit = e => {
		e.preventDefault();
		const { amount, origin, target } = e.target;
		showPairConversion(amount.value, origin.value, target.value);
	};
};
