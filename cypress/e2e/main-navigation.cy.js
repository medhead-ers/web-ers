describe('Naviguation', () => {
  beforeEach(() => {
    // Given ...
    cy.login();
  })
  // ---------------------------------------------------------------------
  it('User should get 404 error when reaching un-existing page', () => {
    // When ...
    cy.visit('/not-an-existing-page');
    cy.contains('Error 404 - Not found.').should('exist');
  });

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
  it('User should access emergency declaration modal when click on declare emergency button', () => {
    // Given ...
    cy.get('#declare-emergency').should('not.exist');
    // When ...
    cy.get('.btn').contains('Déclarer une urgence').click();
    // Then ...
    cy.get('#declare-emergency').should('exist').should('be.visible');
  });

  // ---------------------------------------------------------------------
  it('User should access hospital creation modal when click on create hospital button', () => {
    // Given ...
    cy.visit('/hospitals');
    cy.get('#create-hospital').should('not.exist');
    // When ...
    cy.get('.btn').contains('Ajouter un nouvel hôpital').click();
    // Then ...
    cy.get('#create-hospital').should('exist').should('be.visible');
  });
})
