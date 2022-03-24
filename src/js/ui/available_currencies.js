export const renderAvailableCurrenciesOptionLists = supportedCodes => {
	const $baseSelection = document.querySelector(
		'#exchange-rates form [name=base]'
	);
	const $pairConversionOriginSelection = document.querySelector(
		'#pair-conversion form [name=origin]'
	);
	const $pairConversionTargetSelection = document.querySelector(
		'#pair-conversion form [name=target]'
	);
	for (let [tla, fullReference] of supportedCodes) {
		const $currencyOption = new Option();
		$currencyOption.value = tla;
		const $currencyDescription = document.createElement('span');
		$currencyDescription.textContent = `${tla} (${fullReference})`;
		$currencyOption.append($currencyDescription);
		$baseSelection.appendChild($currencyOption.cloneNode(true));
		$pairConversionOriginSelection.appendChild($currencyOption.cloneNode(true));
		$pairConversionTargetSelection.appendChild($currencyOption);
	}
	const $baseSelectionUSDOption = $baseSelection.querySelector('[value=USD]');
	const $originSelectionUSDOption =
		$pairConversionOriginSelection.querySelector('[value=USD]');
	const $targetSelectionARSOption =
		$pairConversionTargetSelection.querySelector('[value=ARS]');
	$baseSelectionUSDOption && ($baseSelectionUSDOption.defaultSelected = true);
	$originSelectionUSDOption &&
		($originSelectionUSDOption.defaultSelected = true);
	$targetSelectionARSOption &&
		($targetSelectionARSOption.defaultSelected = true);
};
