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

    //stub Admin
    cy.intercept('POST', '/api/Account/RegistreerAdmin', (req) => {
      expect(req.body).to.include('cypressAdmin')
    })

    //Medewerker account aanmaken
    cy.wait(2000)
    cy.get('[name=setMedewerker]').click()
    cy.get('input[name=voornaam]').type('cy')
    cy.get('input[name=achternaam]').type('pressM')
    cy.get('input[name=gebruikersnaam]').type('cypressMedewerker')
    cy.get('input[name=wachtwoord]').type('P@ssw0rd!')
    cy.get('input[name=email]').type('cypressMedewerker@testmail.com')
    cy.get('[name=geboortedatum]').type('2000-01-01')
    cy.get('input[name=adres]').type('geheim')
    cy.get('input[name=telnr]').type('0612345678')
    cy.get('[name=bankrekening]').type('geheim')
    cy.wait(2000)
    cy.get('[name=medewerkerAanmaken]').click()
    cy.contains('Medewerker account is succesvol aangemaakt!')

    //stub Medewerker
    cy.intercept('POST', '/api/Account/RegistreerMedewerker', (req) => {
      expect(req.body).to.include('cypressM')
    })

    //Artiest account aanmaken
    cy.wait(2000)
    cy.get('[name=setArtiest]').click()
    cy.get('input[name=voornaam]').type('cy')
    cy.get('input[name=achternaam]').type('pressA')
    cy.get('input[name=gebruikersnaam]').type('cypressArtiest')
    cy.get('input[name=wachtwoord]').type('P@ssw0rd!')
    cy.get('input[name=email]').type('cypressArtiest@testmail.com')
    cy.get('[name=geboortedatum]').type('2000-01-01')
    cy.get('input[name=adres]').type('geheim')
    cy.get('input[name=telnr]').type('0612345678')
    cy.get('[name=groepId]').type('1')
    cy.wait(2000)
    cy.get('[name=artiestAanmaken]').click()
    cy.contains('Artiest account is succesvol aangemaakt!')

    //stub Artiest
    cy.intercept('POST', '/api/Account/RegistreerArtiest', (req) => {
      expect(req.body).to.include('cypressA')
    })

    //Groep account aanmaken
    cy.wait(2000)
    cy.get('[name=setGroep]').click()
    cy.get('input[name=groepsnaam]').type('cyGroup')
    cy.get('input[name=email]').type('cypressAdmin@testmail.com')
    cy.wait(2000)
    cy.get('[name=groepAanmaken]').click()
    cy.contains('Groep is succesvol aangemaakt!')

    //stub groep
    cy.intercept('POST', '/api/Account/RegistreerGroep', (req) => {
      expect(req.body).to.include('cyGroup')
    })

    //Zaal aanmaken
    cy.wait(2000)
    cy.get('[name=setZaal]').click()
    cy.get('input[name=rang1Stoelen]').type('40')
    cy.get('input[name=rang2Stoelen]').type('60')
    cy.get('input[name=rang3Stoelen]').type('100')
    cy.get('input[name=rang1Rijen]').type('2')
    cy.get('input[name=rang2Rijen]').type('3')
    cy.get('input[name=rang3Rijen]').type('5')
    cy.wait(2000)
    cy.get('[name=zaalAanmaken]').click()
    cy.contains('Zaal is succesvol aangemaakt!')

    //stub Zaal
    cy.intercept('POST', '/api/zaal/AddZaal', (req) => {
      expect(req.body).to.include('200')
    })

    //Voorstelling aanmaken
    cy.wait(2000)
    cy.get('[name=setVoorstelling]').click()
    cy.get('input[name=titel]').type('CyPress')
    cy.get('input[name=beschrijving]').type('Een cypress test beschrijving')
    cy.get('input[name=tijdsduur]').type('180')
    cy.get('input[name=url]').type('https://www.cypress.io/images/contentful/cypress_logo_meta-image-01.png')
    cy.wait(2000)
    cy.get('[name=voorstellingAanmaken]').click()
    cy.contains('Voorstelling is succesvol toegevoegd!')

    //stub voorstelling
    cy.intercept('POST', '/api/Programmering/Voorstelling', (req) => {
      expect(req.body).to.include('CyPress')
    })
  })
})
