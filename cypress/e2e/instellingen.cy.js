describe('account instellingen', () => {
  it('verander gegevens en sla gegevens op', () => {
    cy.visit('https://localhost:44461/')

    cy.contains('Login').click()
    cy.url().should('include', 'login')
    cy.clock();
    cy.tick(1000);
    cy.get('input[name=username]').type('JackieChan')
    cy.get('input[name=password]').type('P@ssw0rd!')
    cy.wait(30000); //recaptcha door gebruiker
    cy.contains('⚙️').click()
    cy.get('[id^=voornaam]').clear().type('JackieTest')
    cy.wait(1000)
    cy.get('[id^=achternaam]').clear().type('ChanTest')
    cy.wait(1000)
    cy.get('[id^=geboortedatum]').click().type('1999-08-12')
    cy.wait(1000)
    
    cy.intercept("https://localhost:44461/api/account/UpdateInstellingen").as("UpdateInstellingen");
    cy.get('[id^=gegevens-opslaan]').click()
    cy.wait("@UpdateInstellingen").then((interception)=>{
      const statusCode = interception.response.statusCode
      expect(statusCode).to.equal(200)
    })
  })
})