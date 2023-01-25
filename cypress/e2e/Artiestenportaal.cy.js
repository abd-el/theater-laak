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
        // cy.contains('Artiestenportaal').click()
        // cy.tick(3000);
        // cy.visit('https://localhost:44461/artiestenportaal')
        // cy.url().should('include', 'artiestenportaal')
        // cy.contains('Boekingen').click()
        // cy.get('name=select-voorstelling').select('6')
    })
})