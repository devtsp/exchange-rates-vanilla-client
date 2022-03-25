export const setExchangeRatesHandler = showExchangeRates => {
	document.querySelector('#exchange-rates form').onsubmit = e => {
		e.preventDefault();
		document.querySelector('#exchange-rates-results tbody').replaceChildren();
		const baseCurrency = e.target.querySelector('[name=base]').value;
		showExchangeRates(baseCurrency);
	};
};

export const setPairConversionHandler = showPairConversion => {
	document.querySelector('#pair-conversion form').onsubmit = e => {
		e.preventDefault();
		document
			.querySelector('#conversion-result')
			.classList.add('visually-hidden');
		const $amount = e.target.querySelector('[name=amount]');
		const $origin = e.target.querySelector('[name=origin]');
		const $target = e.target.querySelector('[name=target]');
		showPairConversion($amount.value, $origin.value, $target.value);
	};
};
