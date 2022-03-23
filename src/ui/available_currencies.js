export const renderAvailableCurrenciesOptionLists = data => {
	const currencies = [...data.supported_codes];
	console.log(currencies);
	const $exchangeRatesForm = document.querySelector('#exchange-rates form');
	const $pairConversionForm = document.querySelector('#pair-conversion form');
	for (let [tla, fullReference] of currencies) {
		const $currencyOption = new Option();
		$currencyOption.value = tla;
		const $currencyDescription = document.createElement('span');
		$currencyDescription.innerText = `${tla} (${fullReference})`;
		$currencyOption.append($currencyDescription);
		console.log($currencyOption);
		$exchangeRatesForm.base.appendChild($currencyOption.cloneNode(true));
		$pairConversionForm.origin.appendChild($currencyOption.cloneNode(true));
		$pairConversionForm.target.appendChild($currencyOption);
	}
	$exchangeRatesForm.base.querySelector('[value=USD]').defaultSelected = true;
	$pairConversionForm.origin.querySelector(
		'[value=USD]'
	).defaultSelected = true;
	$pairConversionForm.target.querySelector(
		'[value=ARS]'
	).defaultSelected = true;
};
