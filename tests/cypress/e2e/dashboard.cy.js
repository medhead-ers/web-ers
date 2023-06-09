describe('Dashboard page', () => {
  beforeEach(() => {
    // Given ...
    cy.login();
  })
  // ---------------------------------------------------------------------
  it('User should access to patients, hospitals and emergencies overview from dashboard page', () => {
    // Then ...
    cy.get('h1').should('contain', 'Dashboard - Urgences');
    cy.get('h2').should('contain', 'Patients');
    cy.get('h2').should('contain', 'Hôpitaux');

    cy.get('table.emergencies-table').should('exist');
    cy.get('table.patients-table').should('exist');
    cy.get('table.hospitals-table').should('exist');

    cy.get('.btn').contains('Déclarer une urgence').should('exist');
  });

  // ---------------------------------------------------------------------
  it('User should access to hospital emergency bedrooms details when click on hospital table row', () => {
    // When ...
    cy.get('table.hospitals-table').find('tr').eq(1).click();
    cy.url().should('match', /.+hospitals\/[a-z0-9-]{36}\/emergency-bedrooms/)
  });
})
