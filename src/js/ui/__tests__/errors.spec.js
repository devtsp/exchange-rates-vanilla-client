/*
 * @jest-environment jsdom
 */

import { renderError, resetError } from '../errors.js';

document.body.innerHTML = `
<div>
  <div class="error d-none"></div>
  <div class="error d-none"></div>
</div>
`;

describe('Render error with correct message', () => {
	test('renderError', () => {
		renderError({ message: 'test' });
		const $firstError = document.querySelector('.error:nth-child(1)');
		const $secondError = document.querySelector('.error:nth-child(2)');
		expect($firstError.innerText).toBe('test');
		expect($firstError.classList.contains('d-none')).toBe(false);
		expect($secondError.innerText).toBe('test');
		expect($secondError.classList.contains('d-none')).toBe(false);
	});
});
describe('Resets error message', () => {
	test('resetError', () => {
		renderError({ message: 'test2' });
		resetError();
		const $firstError = document.querySelector('.error:nth-child(1)');
		const $secondError = document.querySelector('.error:nth-child(2)');
		expect($firstError.innerText).toBe('');
		expect($firstError.classList.contains('d-none')).toBe(true);
		expect($secondError.innerText).toBe('');
		expect($secondError.classList.contains('d-none')).toBe(true);
	});
});
