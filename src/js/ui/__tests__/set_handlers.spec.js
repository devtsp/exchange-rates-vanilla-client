/*
 * @jest-environment jsdom
 */

import {
	setExchangeRatesHandler,
	setPairConversionHandler,
} from '../set_handlers';
import { showExchangeRates, showPairConversion } from '../../exchange_app.js';

jest.mock('../../exchange_app.js', () => {
	return {
		__esModule: true,
		showExchangeRates: jest.fn(),
		showPairConversion: jest.fn(),
	};
});

document.body.innerHTML = `
<div id="exchange-rates">
  <form>
    <input name="base" value="test"/>
  </form>
</div>
<div id="exchange-rates-results" class="visually-hidden">
  <table>
    <tbody></tbody>
  </table>
</div>

<div id="pair-conversion">
  <form>
    <input name="amount" value="123"/>
    <input name="origin" value="TEST_ORIGIN"/>
    <input name="target" value="TEST_TARGET"/>
  </form>
</div>
<p id="conversion-result" class="visually-hidden">
  <span></span>
  <br />
  <span></span>
</p>
`;

describe('Event handlers call the correct callback with correct arguments', () => {
	test('showExchangeRates', () => {
		setExchangeRatesHandler(showExchangeRates);
		document.querySelector('#exchange-rates form').submit();
		expect(showExchangeRates).toHaveBeenCalledWith('test');
	});

	test('showPairConversion', () => {
		setPairConversionHandler(showPairConversion);
		document.querySelector('#pair-conversion form').submit();
		expect(showPairConversion).toHaveBeenCalledWith(
			'123',
			'TEST_ORIGIN',
			'TEST_TARGET'
		);
	});
});
