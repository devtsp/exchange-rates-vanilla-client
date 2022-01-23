const API_URL = 'http://api.exchangeratesapi.io/v1/';
const KEY = '91fd940b557ec6d52701e54ca74445fa';
const $base = document.querySelector('#base-selection-panel');
const $baseSelected = document.querySelector('#base-selected');
const $tbody = document.querySelector('#table-contents');

$base.onclick = e => {
	$tbody.classList.toggle('d-none');
	e.preventDefault();
	$tbody.replaceChildren();
	const base = e.target.innerText;
	if (e.target.nodeName == 'BUTTON') {
		const URL = `${API_URL}/latest?access_key=${KEY}`;
		fetchData(URL, base);
	}
};

const handleSuccess = (data, base) => {
	for (let currency in data.rates) {
		const $row = document.createElement('tr');
		const $currency = document.createElement('th');
		$currency.setAttribute('scope', 'row');
		const $rate = document.createElement('td');
		$currency.innerText = currency;
		$rate.innerText = data.rates[currency] * (1 / data.rates[base]);
		if (currency == base) {
			$rate.innerText = 1;
		}
		$tbody.appendChild($row);
		$row.appendChild($currency);
		$row.appendChild($rate);
	}
	$baseSelected.innerText = `${base}`;
	$tbody.classList.toggle('d-none');
};

const handleFail = () => {
	document.querySelector(
		'#error-message'
	).innerText = `An error ocurred fetching the data. Please try again later`;
};

const fetchData = (URL, base) => {
	fetch(URL)
		.then(resp => resp.json())
		.then(resp => {
			if (resp.success) {
				handleSuccess(resp, base);
			} else {
				handleFail();
			}
		})
		.catch(err =>
			console.error('There was an error fetching the requested data: ', err)
		);
};
