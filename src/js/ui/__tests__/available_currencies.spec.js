/*
 * @jest-environment jsdom
 */

import { renderAvailableCurrenciesOptionLists } from '../available_currencies.js';

document.body.innerHTML = `
<div id="exchange-rates"> 
  <form> 
    <select name="base"></select>
  </form>
</div>
<div id="pair-conversion">
  <form>
    <select name="origin"></select>
    <select name="target"></select>
  </form>
</div>
`;

describe('Currencies are correctly rendered inside <select> elements as <option> tags within forms', () => {
	test('renderAvailableCurrenciesOptionLists', () => {
		renderAvailableCurrenciesOptionLists([
			['TEST_1', '1'],
			['TEST_2', '2'],
		]);
		const $baseSelection = document.querySelector(
			'#exchange-rates form [name=base]'
		);
		const $pairConversionForm = document.querySelector('#pair-conversion form');
		expect($baseSelection.children.length).toBe(2);
		expect($baseSelection.children[0].value).toBe('TEST_1');
		expect($baseSelection.children[0].querySelector('span').textContent).toBe(
			'TEST_1 (1)'
		);
		expect($baseSelection.children[1].value).toBe('TEST_2');
		expect($baseSelection.children[1].querySelector('span').textContent).toBe(
			'TEST_2 (2)'
		);
	});
});
