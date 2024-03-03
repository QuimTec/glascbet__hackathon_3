describe('My First Page Test', () => {
    it('Visits the Kitchen Sink', () => {
      cy.visit('https://example.cypress.io')

      cy.contains('type')
    })
  })