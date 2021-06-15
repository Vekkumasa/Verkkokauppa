describe('Verkkokauppa ', () => {
  it('front page can be opened', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Verkkokauppa');
    cy.contains('Mokki Essential');
  });
});