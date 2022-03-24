export const renderAvailableCurrenciesOptionLists = supportedCodes => {
	const $exchangeRatesForm = document.querySelector('#exchange-rates form');
	const $pairConversionForm = document.querySelector('#pair-conversion form');
	for (let [tla, fullReference] of supportedCodes) {
		const $currencyOption = new Option();
		$currencyOption.value = tla;
		const $currencyDescription = document.createElement('span');
		$currencyDescription.innerText = `${tla} (${fullReference})`;
		$currencyOption.append($currencyDescription);
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
