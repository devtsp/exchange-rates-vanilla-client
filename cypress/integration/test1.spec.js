const APP_URL = 'http://127.0.0.1:5500';
const API_URL = 'https://v6.exchangerate-api.com/v6/ec7eec5e7967904472b9cf30/';

describe('Initial DOM setup', () => {
	it('Fill all the app <select> elements with fetched data of supported API currencies', () => {
		cy.intercept('**/codes', req => {
			req.reply({ fixture: 'supported-currencies' });
		}).as('codes');
		cy.visit(APP_URL);
		cy.wait('@codes').then(request => {
			const codes = [...request.response.body.supported_codes];
			cy.get('select').each($select => {
				$select.children().each((index, $option) => {
					expect($option.value).to.equal(codes[index][0]);
				});
			});
		});
	});
});