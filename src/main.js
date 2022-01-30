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

const fetchData = (URL, callback = v => v) => {
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
	$loadingMask.classList.add('visually-hidden');
};

const handleCodes = data => {
	localStorage.getItem('supportedCodes') ||
		localStorage.setItem('supportedCodes', JSON.stringify(data));
	const currencies = [...data.supported_codes];
	for (let currency of currencies) {
		const $option = new Option();
		const $currency = document.createElement('span');
		$currency.innerText = `${currency[0]} (${currency[1]})`;
		$option.append($currency);
		$option.value = currency[0];
		$exchangeRatesForm['rates-base'].appendChild($option.cloneNode(true));
		$pairConversionForm['base'].appendChild($option.cloneNode(true));
		$pairConversionForm['target'].appendChild($option);
	}
	$exchangeRatesForm.querySelector('[value=USD]').defaultSelected = true;
	get('#conversion-base [value=USD]').defaultSelected = true;
	get('#target [value=ARS]').defaultSelected = true;
};

const displayExchangeRatesTable = data => {
	$table.classList.remove('d-none');
	const currencies = data.conversion_rates;
	for (let currency in currencies) {
		const $row = document.createElement('tr');
		const $currency = document.createElement('th');
		$currency.setAttribute('scope', 'row');
		const $rate = document.createElement('td');
		$currency.innerText = currency;
		$rate.innerText = data.conversion_rates[currency];
		$tbody.append($row);
		$row.append($currency);
		$row.append($rate);
		$row.classList.add('d-flex');
		$rate.classList.add('w-50');
		$currency.classList.add('w-50');
	}
	get('#table tbody tr:first-child').classList.add('table-success');
	get('#table thead th:first-child').innerText = 'Currencies';
	get('#table thead th:last-child').innerText = 'Exchange Rate';
	$loadingMask.classList.add('visually-hidden');
};

const handleFail = err => {
  $loadingMask.classList.add('visually-hidden');
	$errorPlaceholders.forEach($placeholder => {
		$placeholder.classList.contains('d-none') &&
			$placeholder.classList.remove('d-none');
		$placeholder.innerText =
			'Ups! something went wrong. Please try again later';
	});
};

(() => {
	const forms = document.querySelectorAll('.needs-validation');
	Array.prototype.slice.call(forms).forEach(form => {
		form.addEventListener(
			'submit',
			event => {
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

const getCodes = () => {
	const stored = localStorage.getItem('supportedCodes');
	if (!stored) {
		fetchData(`${API_URL}/${KEY}/codes`, handleCodes);
	} else {
		handleCodes(JSON.parse(stored));
	}
};

getCodes();

$exchangeRatesForm.onsubmit = e => {
	$loadingMask.classList.remove('visually-hidden');
	$errorPlaceholders.forEach($placeholder => {
		$placeholder.classList.add('d-none');
	});
	e.preventDefault();
	$tbody.replaceChildren();
	const base = $exchangeRatesForm['rates-base'].value;
	const URL = `${API_URL}/${KEY}/latest/${base}`;
	fetchData(URL, displayExchangeRatesTable);
};

$pairConversionForm.onsubmit = e => {
	$errorPlaceholders.forEach($placeholder => {
		$placeholder.classList.add('d-none');
	});
	e.preventDefault();
	const base = $pairConversionForm['base'].value;
	const target = $pairConversionForm['target'].value;
	const amount = $pairConversionForm['amount'].value;
	const URL = `${API_URL}/${KEY}/pair/${base}/${target}/${amount}`;
	console.log(URL);
	if (amount) {
		$loadingMask.classList.remove('visually-hidden');
		fetchData(URL, displayConversion);
	}
};
