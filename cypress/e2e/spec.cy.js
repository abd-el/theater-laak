describe('Visit HomePage theaterLaak', () => {
  it('gaat naar programmering', () => {
    cy.visit('https://localhost:44461/')

    cy.contains('Programmering').click()

    cy.contains('Morgen').click()

    cy.contains('14:50').click()

    cy.contains('R1 S1').click()

    
  })
})
