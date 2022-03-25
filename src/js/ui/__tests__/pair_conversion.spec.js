/*
 * @jest-environment jsdom
 */

import { renderPairConversionCard } from '../pair_conversion.js';

document.body.innerHTML = `
<div id="pair-conversion">
  <form>
    <input name="amount" value="999"/>
  </form>
</div>
<p id="conversion-result" class="visually-hidden">
  <span></span>
  <br />
  <span></span>
</p>
`;

const mockedConversionResult = {
	base_code: 'ORIGIN',
	target_code: 'TARGET',
	conversion_result: 123,
};

describe('Render pair conversion result to DOM', () => {
	test('renderExchangeRatesTable', () => {
		renderPairConversionCard(mockedConversionResult);
		const $conversionResult = document.querySelector('#conversion-result');
		expect($conversionResult.children[0].innerText).toBe('999 ORIGIN = ');
		expect($conversionResult.children[2].innerText).toBe(' 123 TARGET');
	});
});
