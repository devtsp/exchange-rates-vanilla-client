const $exchangeRatesForm = document.querySelector('#exchange-rates form');
const $table = document.querySelector('#table');
const $thead = document.querySelector('#table thead');
const $tbody = document.querySelector('#table tbody');

const $errorPlaceholders = document.querySelectorAll('.error');
const $loadingMask = document.querySelector('#loading-mask');
const $pairConversionForm = document.querySelector('#pair-conversion form');
const $pairConversionResult = document.querySelector('#pair-conversion p');

const displayConversion = data => {
	$pairConversionResult.children[0].innerText = `${$pairConversionForm['amount'].value} ${data.base_code} = `;
	$pairConversionResult.children[2].innerText = ` ${data.conversion_result} ${data.target_code}`;
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
	document.querySelector('#conversion-base [value=USD]').defaultSelected = true;
	document.querySelector('#target [value=ARS]').defaultSelected = true;
};

const displayExchangeRatesTable = data => {
	const currencies = data.conversion_rates;
	console.log(currencies);
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
	$table.classList.remove('visually-hidden');
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
	e.preventDefault();
	$loadingMask.classList.remove('visually-hidden');
	$table.classList.add('visually-hidden');
	$errorPlaceholders.forEach($placeholder => {
		$placeholder.classList.add('d-none');
	});
	$tbody.replaceChildren();
	const base = $exchangeRatesForm['rates-base'].value;
	const URL = `${API_URL}/${KEY}/latest/${base}`;
	fetchData(URL, displayExchangeRatesTable);
};

$pairConversionForm.onsubmit = e => {
	$pairConversionResult.classList.add('visually-hidden');
	$errorPlaceholders.forEach($placeholder => {
		$placeholder.classList.add('d-none');
	});
	e.preventDefault();
	const base = $pairConversionForm['base'].value;
	const target = $pairConversionForm['target'].value;
	const amount = $pairConversionForm['amount'].value;
	const URL = `${API_URL}/${KEY}/pair/${base}/${target}/${amount}`;
	if (amount) {
		$loadingMask.classList.remove('visually-hidden');
		fetchData(URL, displayConversion);
	}
};
