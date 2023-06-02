describe('Naviguation', () => {
  beforeEach(() => {
    // Given ...
    cy.login();
    cy.get('#sidebarMenu').contains('Dashboard').should('exist');
  })
  // ---------------------------------------------------------------------
  it('User should goes to hospitals management when click on hospitals management menu link', () => {
    // When ...
    cy.get('#sidebarMenu').contains('Gestion des Hôpitaux').click();
    // Then ...
    cy.url().should('contain', '/hospitals');
    cy.get('#sidebarMenu').contains('Gestion des Hôpitaux').should('have.class', 'active');
  });

  // ---------------------------------------------------------------------
  it('User should goes dashboard  when click on dashboard menu link', () => {
    // When ...
    cy.visit('/hospitals');
    cy.get('#sidebarMenu').contains('Dashboard').click();
    // Then ...
    cy.url().should('contain', '/dashboard');
    cy.get('#sidebarMenu').contains('Dashboard').should('have.class', 'active');
  });

  // ---------------------------------------------------------------------
  it('User should get 404 error when reaching un-existing page', () => {
    // When ...
    cy.visit('/not-an-existing-page');
    cy.contains('Error 404 - Not found.').should('exist');
  });
})
