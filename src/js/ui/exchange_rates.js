export const renderExchangeRatesTable = exchangeRates => {
	const $table = document.querySelector('#exchange-rates-results table');
	$table.classList.remove('visually-hidden');
	const $tbody = document.querySelector('#exchange-rates-results tbody');
	const currencyEntries = Object.entries(exchangeRates);
	for (let [name, value] of currencyEntries) {
		const $currencyName = document.createElement('th');
		$currencyName.classList.add('w-50');
		$currencyName.setAttribute('scope', 'row');
		$currencyName.innerText = name;
		const $currencyRateValue = document.createElement('td');
		$currencyRateValue.classList.add('w-50');
		$currencyRateValue.innerText = value;
		const $currencyRow = document.createElement('tr');
		$currencyRow.classList.add('d-flex');
		$currencyRow.append($currencyName);
		$currencyRow.append($currencyRateValue);
		$tbody.append($currencyRow);
	}
	$tbody.querySelector('tr:nth-child(1)').classList.add('table-success');
};
