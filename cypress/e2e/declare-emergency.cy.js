describe('Declare Emergency Process', () => {
  // ---------------------------------------------------------------------
  it('User should successfully declare emergency', () => {
    // Given
    cy.login();
    // Then ...
    cy.get('#declare-emergency').should('not.exist');
    cy.get('#emergency-dispatched-notification').should('not.exist');
    // When ...
    cy.get('.btn').contains('Déclarer une urgence').click();
    // Then ...
    cy.get('#declare-emergency').should('exist').should('be.visible');
    // And when ...
    cy.get('input#patientLastName').type('LastName');
    cy.get('input#patientFirstName').type('FirstName');
    cy.get('select#patientGender').select('Masculin');
    cy.get('input#patientAge').type(30);
    cy.get('select#emergencyType').select('Cardiologie');
    cy.get('textarea#emergencyDescription').type('An emergency description');
    cy.get('input#emergencyGpsLatitude').type(51.52368647004438);
    cy.get('input#emergencyGpsLongitude').type(-0.1425965117175789);

    cy.get('.btn').contains('Valider').click();
    // Then ...
    cy.get('#declare-emergency').should('not.exist');
    cy.get('#emergency-dispatched-notification').should('be.visible');

    // And when ...
    cy.get('.btn').contains('Terminer').click();
    cy.get('#emergency-dispatched-notification').should('not.exist');
  });

})
