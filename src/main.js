const API_URL = 'https://v6.exchangerate-api.com/v6';
const KEY = 'ec7eec5e7967904472b9cf30';
const $base = document.querySelector('#base-selection-panel');
const $baseSelected = document.querySelector('#base-selected');
const $tbody = document.querySelector('#table-contents');
const $errorMessage = document.querySelector('#error-message');
const $loadingMask = document.querySelector('#loading-mask')

$base.onclick = e => {
	e.preventDefault();
  $loadingMask.classList.toggle('visually-hidden')
	$tbody.replaceChildren();
	const base = e.target.innerText;
	if (e.target.nodeName == 'BUTTON') {
		const URL = `${API_URL}/${KEY}/latest/${base}`;
		fetchData(URL, base);
	}
};

const handleSuccess = data => {
	for (let currency in data.conversion_rates) {
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
  $loadingMask.classList.toggle('visually-hidden')
	$tbody.querySelector('tr:first-child').classList.add('table-success');
};

const handleFail = (err) => {
  $loadingMask.classList.toggle('visually-hidden')
	$errorMessage.classList.contains('d-none') &&
		$errorMessage.classList.remove('d-none');
	$errorMessage.innerText = `An error ocurred with the server: "${err.message}"`;
};

const fetchData = (URL, base) => {
  fetch(URL)
    .then(resp => resp.json())
    .then(resp => {
      if (resp.result == 'success') {
        handleSuccess(resp);
      } else {
        handleFail();
      }
    })
    .catch(err => handleFail(err));
};
