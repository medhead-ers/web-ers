describe('Authentication page', () => {
  // ---------------------------------------------------------------------
  it('Successfully loads when reach any page', () => {
    // When...
    cy.visit('/')
    // Then...
    cy.url().should('include', '/login')
  });

  // ---------------------------------------------------------------------
  it('User should fail to login when using bad credentials', () => {
    // When...

    cy.login('FakeUser', 'AnImprobablePassword', true);

    // Then...
    cy.get('div.alert.alert-danger').should('contain', 'Erreur : Identifiants invalides')
  });

  // ---------------------------------------------------------------------

  it('User should success login and access dashboard when using correct credentials', () => {
    // When...
    cy.login();
    // Then...
    cy.url().should('include', '/dashboard')
  });

  // ---------------------------------------------------------------------
  it('User should success logout and go back to login page when clicking on logout button', () => {
    // Given ...
    cy.login();
    // When ...
    cy.get('.btn').contains('Déconnexion').click();
    // Then ...
    cy.url().should('include', '/login')
  });

})
