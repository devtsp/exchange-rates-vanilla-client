import { initExchangeApp } from './exchange-app.js';

window.addEventListener('DOMContentLoaded', () => {
	initExchangeApp();
});

// const $pairConversionResult = document.querySelector('#pair-conversion p');

// const displayConversion = data => {
// 	$pairConversionResult.children[0].innerText = `${$pairConversionForm['amount'].value} ${data.base_code} = `;
// 	$pairConversionResult.children[2].innerText = ` ${data.conversion_result} ${data.target_code}`;
// 	$pairConversionResult.classList.remove('visually-hidden');
// 	$loadingMask.classList.add('visually-hidden');
// };

// $pairConversionForm.onsubmit = e => {
// 	$pairConversionResult.classList.add('visually-hidden');
// 	$errorPlaceholders.forEach($placeholder => {
// 		$placeholder.classList.add('d-none');
// 	});
// 	e.preventDefault();
// 	const base = $pairConversionForm['base'].value;
// 	const target = $pairConversionForm['target'].value;
// 	const amount = $pairConversionForm['amount'].value;
// 	const URL = `${API_URL}/${KEY}/pair/${base}/${target}/${amount}`;
// 	if (amount) {
// 		$loadingMask.classList.remove('visually-hidden');
// 		fetchData(URL, displayConversion);
// 	}
// };
