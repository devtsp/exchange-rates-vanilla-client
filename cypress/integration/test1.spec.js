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

describe('Exchange rates section interaction', () => {
	it('Display rates table on submit', () => {
		cy.intercept('**/latest/**', req => {
			req.reply({ fixture: 'usd-rates' });
		}).as('latestRates');
		cy.get('[data-cy=fetched-rates-table]').should('not.be.visible');
		cy.get('[data-cy=rates-form]').submit();
		cy.get('[data-cy=fetched-rates-table]').should('be.visible');
	});
});

describe('Links', () => {
	it('Correctly change visible content when changing tab', () => {
		cy.get('[data-cy=conversion-panel]')
			.should('not.be.visible')
			.then($conversionPanel => {
				cy.get('[data-cy=link-to-conversion-panel]').click();
				cy.wrap($conversionPanel).should('be.visible');
			});
		cy.get('[data-cy=rates-panel]').should('not.be.visible');
	});
});

describe('Pair conversion section interaction', () => {
	it('Display conversion card on submit after filling amount', () => {
		cy.intercept('**/pair/**', req => {
			req.reply({ fixture: 'pair-conversion.json' });
		}).as('pairConversion');
		cy.get('[data-cy=conversion-result]').as('result');
		cy.get('[data-cy=conversion-amount]').type('123');
		cy.get('[data-cy=conversion-form]').submit();
		cy.get('@result').should('be.visible');
		cy.get('[data-cy=conversion-error]').should('not.be.visible');
	});
});
