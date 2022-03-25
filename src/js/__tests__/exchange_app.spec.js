/*
 * @jest-environment jsdom
 */

import { initExchangeApp } from '../exchange_app';
import { setBootstrapFormValidations } from '../ui/form_validations';
import {
	setExchangeRatesHandler,
	setPairConversionHandler,
} from '../ui/set_handlers';

jest.mock('../ui/set_handlers', () => {
	return {
		__esModule: true,
		setExchangeRatesHandler: jest.fn(),
		setPairConversionHandler: jest.fn(),
	};
});

jest.mock('../ui/form_validations', () => {
	return {
		__esModule: true,
		setBootstrapFormValidations: jest.fn(),
	};
});

document.body.innerHTML = `
<div id="loading-mask" class="visually-hidden"></div>
<div class="error" class="d-none"></div>
`;

global.fetch = jest.fn(() => {
	throw Error('test');
});

describe('Correct callbacks are called on initialization', () => {
	test('initExchangeApp', () => {
		initExchangeApp();
		expect(setExchangeRatesHandler).toHaveBeenCalled();
		expect(setPairConversionHandler).toHaveBeenCalled();
		expect(setBootstrapFormValidations).toHaveBeenCalled();
	});
});
