describe('Artiest Login', () => {
    it('Login', () => {
        cy.visit('https://localhost:44461/')

        cy.contains('Login').click()
        cy.url().should('include', 'login')
        cy.clock();
        cy.tick(1000);
        cy.get('input[name=username]').type('RayJones2')
        cy.get('input[name=password]').type('P@ssw0rd!')
        cy.wait(40000); //recaptcha door gebruiker
        cy.contains('submit').click()

        //verzoek voor een reservering doen
        cy.contains('Artiestenportaal').click()
        cy.url().should('include', 'artiestenportaal')
        cy.contains('Boekingen').click()
        cy.get('select[name=select-voorstelling]').select(6)
        cy.get('select[name=select-groep]').select(1)
        cy.get('select[name=select-zaal]').select(3)
        cy.get('input[id=datum-invoer]').type('2023-01-26')
        cy.get('input[id=tijdstip-invoer]').type('15:00')
        cy.get('input[id=prijs-invoer]').type(20)
        cy.contains('Maak een verzoek voor een reservering').click()

        //stub
        cy.intercept('POST', '/api/artiestenportaal/MaakBoeking', (req) => {
            expect(req.body).to.include('15:00')
        })
    })
})