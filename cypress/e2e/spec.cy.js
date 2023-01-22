describe('Admin Login', () => {
  it('Login', () => {
    cy.visit('https://localhost:44461/')

    cy.contains('Login').click()
    cy.url().should('include', 'login')
    cy.clock();
    cy.tick(1000);
    cy.get('input[name=username]').type('JackieChan')
    cy.get('input[name=password]').type('P@ssw0rd!')
    cy.wait(40000); //recaptcha door gebruiker
    cy.contains('submit').click()

// alle getter knopen drukken
    cy.wait(2000)
    cy.contains('Dashboard').click()
    cy.wait(2000)
    cy.get('[name=getAdmins]').click()
    cy.wait(2000)
    cy.get('[name=getMedewerkers]').click()
    cy.wait(2000)
    cy.get('[name=getArtiesten]').click()
    cy.wait(2000)
    cy.get('[name=getGroepen]').click()
    cy.wait(2000)
    cy.get('[name=getDonateurs]').click()
    cy.wait(2000)
    cy.get('[name=getZalen]').click()
    cy.wait(2000)
    cy.get('[name=getVoorstellingen]').click()
    cy.wait(2000)
    cy.get('[name=getOptredens]').click()
    cy.wait(2000)
    cy.get('[name=getVerzoeken]').click()

//admin account aanmaken
    cy.wait(2000)
    cy.get('[name=setAdmin]').click()
    cy.get('input[name=voornaam]').type('cy')
    cy.get('input[name=achternaam]').type('press')
    cy.get('input[name=gebruikersnaam]').type('cypressAdmin')
    cy.get('input[name=wachtwoord]').type('P@ssw0rd!')
    cy.get('input[name=email]').type('cypressAdmin@testmail.com')
    cy.get('[name=geboortedatum]').type('2000-01-01')
    cy.get('input[name=adres]').type('geheim')
    cy.get('input[name=telnr]').type('0612345678')
    cy.get('[name=bankrekening]').type('geheim')
    cy.wait(2000)
    cy.get('[name=adminAanmaken]').click()
    cy.contains('Admin account is succesvol aangemaakt!')
  })
})
