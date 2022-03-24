/*
 * @jest-environment jsdom
 */

import { renderExchangeRatesTable } from '../exchange_rates.js';

document.body.innerHTML = `
<div id="exchange-rates-results">
  <table class="visually-hidden">
    <tbody>
    </tbody>
  </table>
</div>
`;

describe('Render exchange rates table to DOM', () => {
	test('renderExchangeRatesTable', () => {
		renderExchangeRatesTable({ 'TEST_1': 1, 'TEST_2': 2 });
		const $exchangeRatesTable = document.querySelector(
			'#exchange-rates-results table'
		);
		const $tbody = document.querySelector('#exchange-rates-results tbody');
		expect($exchangeRatesTable.classList.contains('visually-hidden')).toBe(
			false
		);
		expect($tbody.children[0].querySelector('th').innerText).toBe('TEST_1');
		expect($tbody.children[0].querySelector('td').innerText).toBe(1);
		expect($tbody.children[1].querySelector('th').innerText).toBe('TEST_2');
		expect($tbody.children[1].querySelector('td').innerText).toBe(2);
	});
});
