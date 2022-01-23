const API_URL = 'http://api.exchangeratesapi.io/v1/';
const latest = 'latest';
const KEY = '91fd940b557ec6d52701e54ca74445fa';
const $EUR = document.querySelector('#EUR');
const $result = document.querySelector('#result');

const fetchData = URL => {
	fetch(URL);
};

$EUR.onclick = e => {
	console.log('clicked EUR');
	fetch(
		'http://api.exchangeratesapi.io/v1/latest?access_key=91fd940b557ec6d52701e54ca74445fa'
	)
		.then(resp => resp.json())
		.then(resp => {
			console.log(resp);
      handleFetchedData(resp)
		})
		.catch(err =>
			console.error('There was an error fetching the requested data: ', err)
		);
};


const handleFetchedData = data => {
  $result.innerText = JSON.stringify(data.rates, null, 1)
} 