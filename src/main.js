const API_URL = 'https://v6.exchangerate-api.com/v6';
const KEY = 'ec7eec5e7967904472b9cf30';

const get = selector => {
	return document.querySelector(selector);
};

const $exchangeRatesForm = get('#exchange-rates form');
const $table = get('#table');
const $thead = get('#table thead');
const $tbody = get('#table tbody');

const $errorPlaceholders = document.querySelectorAll('.error');
const $loadingMask = get('#loading-mask');

const $pairConversionForm = get('#pair-conversion form');
const $pairConversionResult = get('#pair-conversion p');

const fetchData = (URL, callback) => {
	fetch(URL)
		.then(resp => resp.json())
		.then(resp => {
			if (resp.result == 'success') {
				callback(resp);
			} else {
				handleFail(resp);
			}
		})
		.catch(err => handleFail(err));
};

const displayConversion = data => {
	$pairConversionResult.children[0].innerText = `${$pairConversionForm['amount'].value} ${data.base_code} = `;
	$pairConversionResult.children[2].innerText = ` ${data.conversion_result} ${data.target_code}`;
  $pairConversionResult.classList.contains('visually-hidden') &&
		$pairConversionResult.classList.remove('visually-hidden');
};

const loadAvailableCurrencies = data => {
	for (let currency in data.conversion_rates) {
		const $option = document.createElement('option');
		$option.innerText = currency;
		$option.value = currency;
		$exchangeRatesForm['rates-base'].appendChild($option.cloneNode(true));
		$pairConversionForm['base'].appendChild($option.cloneNode(true));
		$pairConversionForm['target'].appendChild($option);
	}
};

const displayExchangeRatesTable = data => {
  $table.classList.remove('d-none')
	const currencies = data.conversion_rates;
	for (let currency in currencies) {
		const $row = document.createElement('tr');
		const $currency = document.createElement('th');
		$currency.setAttribute('scope', 'row');
		const $rate = document.createElement('td');
		$currency.innerText = currency;
		$rate.innerText = data.conversion_rates[currency];
		$tbody.appendChild($row);
		$row.appendChild($currency);
		$row.appendChild($rate);
		$row.classList.add('d-flex', 'overflow-auto');
		$rate.classList.add('w-50');
		$currency.classList.add('w-50');
	}
	$tbody.querySelector('tr:first-child').classList.add('table-success');
	$thead.querySelector('th:first-child').innerText = 'Currencies';
	$thead.querySelector('th:last-child').innerText = 'Exchange Rate';
	
};

const handleFail = err => {
	$errorPlaceholders.forEach($placeholder => {
		$placeholder.classList.contains('d-none') &&
			$placeholder.classList.remove('d-none');
		$placeholder.innerText = 'Ups! something went wrong with the server. Try again later';
	});
};

// FORM VALIDATION FROM BOOTSTRAP //

(function () {
	'use strict';

	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.querySelectorAll('.needs-validation');

	// Loop over them and prevent submission
	Array.prototype.slice.call(forms).forEach(function (form) {
		form.addEventListener(
			'submit',
			function (event) {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add('was-validated');
			},
			false
		);
	});
})();

// ON LOAD //

fetchData(`${API_URL}/${KEY}/latest/USD`, loadAvailableCurrencies);

// SUBMITS //

$exchangeRatesForm.onsubmit = e => {
  $errorPlaceholders.forEach($placeholder => {
		$placeholder.classList.add('d-none');
	});
	e.preventDefault();
	$loadingMask.classList.toggle('visually-hidden');
	$tbody.replaceChildren();
	const base = $exchangeRatesForm['rates-base'].value;
	const URL = `${API_URL}/${KEY}/latest/${base}`;
	fetchData(URL, displayExchangeRatesTable);
	$loadingMask.classList.toggle('visually-hidden');
};

$pairConversionForm.onsubmit = e => {
  $errorPlaceholders.forEach($placeholder => {
		$placeholder.classList.add('d-none');
	});
	e.preventDefault();
	$loadingMask.classList.toggle('visually-hidden');
	
	const base = $pairConversionForm['base'].value;
	const target = $pairConversionForm['target'].value;
	const amount = $pairConversionForm['amount'].value;
	const URL = `${API_URL}/${KEY}/pair/${base}/${target}/${amount}`;
	amount && fetchData(URL, displayConversion);
	$loadingMask.classList.toggle('visually-hidden');
};
