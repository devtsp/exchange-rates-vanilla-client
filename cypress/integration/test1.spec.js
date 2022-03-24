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

describe('Links', () => {
	it('Correctly display contents when changing app tabs', () => {
		cy.get('[data-cy=conversion-panel]')
			.should('not.be.visible')
			.then($conversionPanel => {
				cy.get('[data-cy=link-to-conversion-panel]').click();
				cy.wrap($conversionPanel).should('be.visible');
				cy.get('[data-cy=rates-panel]')
					.should('not.be.visible')
					.then($ratesPanel => {
						cy.get('[data-cy=link-to-rates-panel]').click();
						cy.wrap($ratesPanel).should('be.visible');
						cy.wrap($conversionPanel).should('not.be.visible');
					});
			});
	});

	it('Links to API and source code have both the proper href value setted', () => {
		cy.get('[data-cy=official-api-link]').should(
			'have.attr',
			'href',
			'https://www.exchangerate-api.com/'
		);
		cy.get('[data-cy=source-code-link]').should(
			'have.attr',
			'href',
			'https://github.com/devtsp/exchange-rates-api-interface'
		);
	});
});

describe('Exchange rates section interaction', () => {
	it('Display rates table on submit', () => {
		cy.intercept('**/latest/**', req => {
			req.reply({ fixture: 'usd-rates' });
		}).as('latestRates');
		cy.get('[data-cy=fetched-rates-table]').should(
			'have.class',
			'visually-hidden'
		);
		cy.get('[data-cy=rates-form]')
			.submit()
			.then($form => {
				cy.get('[data-cy=fetched-rates-table]').should(
					'not.have.class',
					'visually-hidden'
				);
			});
	});
});

describe('Pair conversion section interaction', () => {
	it('Display conversion card on submit after filling amount', () => {
		cy.intercept('**/pair/**', req => {
			req.reply({ fixture: 'pair-conversion.json' });
		}).as('pairConversion');
		cy.get('[data-cy=link-to-conversion-panel]').click();
		cy.get('[data-cy=conversion-amount]').type('1');
		cy.get('[data-cy=conversion-form]')
			.submit()
			.then($form => {
				cy.get('[data-cy=conversion-result]').should('be.visible');
				cy.get('[data-cy=conversion-error]').should('not.be.visible');
			});
	});
});

describe('Error messages', () => {
	it('Display error message on conversion fetch fail', () => {
		cy.intercept('**/pair/**', req => {
			req.destroy();
		}).as('conversionDestroy');
		cy.get('[data-cy=conversion-form]')
			.submit()
			.then($form => {
				cy.get('[data-cy=conversion-error]').should('be.visible');
			});
	});

	it('Display error message on rates fetch fail', () => {
		cy.intercept('**/latest/**', req => {
			req.destroy();
		}).as('ratesDestroy');
		cy.get('[data-cy=link-to-rates-panel]').click();
		cy.get('[data-cy=rates-form]')
			.submit()
			.then($form => {
				cy.get('[data-cy=rates-error]').should('not.have.class', 'd-none');
			});
	});

	it('Errors must not be visible on reload', () => {
		cy.intercept('**/codes', req => {
			req.reply({ fixture: 'supported-currencies' });
		}).as('codes');
		cy.visit(APP_URL).then(url => {
			cy.get('[data-cy=rates-error]').should('not.be.visible');
		});
	});
});
