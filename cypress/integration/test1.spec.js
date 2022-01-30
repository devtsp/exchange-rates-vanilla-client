const APP_URL = 'http://127.0.0.1:5500';
const API_URL = 'https://v6.exchangerate-api.com/v6/ec7eec5e7967904472b9cf30/';

describe('Initial DOM setup', () => {
	it('Fetch the supported currencies and displays them as option objects in both "rates" and "conversion" select form objects', () => {
		cy.intercept('**/codes', req => {
			delete req.headers['if-none-match'];
			req.reply({ fixture: 'supported-currencies' });
		}).as('codes');
		cy.visit(APP_URL);
		cy.wait('@codes').then(request => {
			cy.log(request);
		});
	});
});
