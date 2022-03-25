/*
 * @jest-environment jsdom
 */

import { toggleLoading } from '../utils.js';

document.body.innerHTML = `
<div id="loading-mask" class="visually-hidden"></div>
`;
describe('Loading screen toggles properly', () => {
	test('toggleLoading', () => {
		expect(
			document
				.querySelector('#loading-mask')
				.classList.contains('visually-hidden')
		).toBe(true);
		toggleLoading();
		expect(
			document
				.querySelector('#loading-mask')
				.classList.contains('visually-hidden')
		).toBe(false);
	});
});
