const API_URL = 'https://v6.exchangerate-api.com/v6';
const KEY = 'ec7eec5e7967904472b9cf30';
const $tableContainer = document.querySelector('#table-container');
const $tbody = document.querySelector('#table-contents');
const $errorMessage = document.querySelector('#error-message');
const $loadingMask = document.querySelector('#loading-mask');
const $globalExhangeRatesButton = document.querySelector(
	'#global-exchange-rates'
);
const $pairConversionButton = document.querySelector('#pair-conversion');
const $baseSelectionForm = document.querySelector('#base-selection-form');
const $baseSelection = document.querySelector('#base-selection');
const $baseButton = document.querySelector('#base-button');

$globalExhangeRatesButton.onclick = e => {
	e.preventDefault();
	$loadingMask.classList.toggle('visually-hidden');
	$tbody.replaceChildren();
	const URL = `${API_URL}/${KEY}/latest/USD`;
	fetchData(URL);
};

$baseButton.onclick = e => {
	e.preventDefault();
	$loadingMask.classList.toggle('visually-hidden');
	$tbody.replaceChildren();
  base = $baseSelectionForm['base-currency'].value
	const URL = `${API_URL}/${KEY}/latest/${base}`;
	fetchData(URL);
};

const fetchData = URL => {
	fetch(URL)
		.then(resp => resp.json())
		.then(resp => {
			if (resp.result == 'success') {
				console.log('success');
				handleSuccess(resp);
			} else {
				console.log('fail');
				handleFail();
			}
		})
		.catch(err => handleFail(err));
};

const handleSuccess = data => {
	$baseSelectionForm.classList.remove('visually-hidden');
	console.log(data);
	const currencies = data.conversion_rates;
	for (let currency in currencies) {
		const $option = document.createElement('option');
		$option.innerText = currency;
    $option.value = currency;
		$baseSelection.appendChild($option);
    const $row = document.createElement('tr');
		const $currency = document.createElement('th');
		$currency.setAttribute('scope', 'row');
		const $rate = document.createElement('td');
		$currency.innerText = currency;
		$rate.innerText = data.conversion_rates[currency];
		$tbody.appendChild($row);
		$row.appendChild($currency);
		$row.appendChild($rate);
	}
	$loadingMask.classList.toggle('visually-hidden');
	$tbody.querySelector('tr:first-child').classList.add('table-success');
	$tableContainer.classList.remove('visually-hidden');
};

const handleFail = err => {
	$loadingMask.classList.toggle('visually-hidden');
	$errorMessage.classList.contains('d-none') &&
		$errorMessage.classList.remove('d-none');
	$errorMessage.innerText = `An error ocurred with the server: "${err.message}"`;
};
