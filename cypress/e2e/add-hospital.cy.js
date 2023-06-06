describe('Add Hospital Process', () => {
  // ---------------------------------------------------------------------
  it('User should successfully create hospital', () => {
    // Given
    cy.login();
    cy.visit('/hospitals');
    // Then ...
    cy.get('#create-hospital').should('not.exist');
    // When ...
    cy.get('.btn').contains('Ajouter un nouvel hôpital').click();
    // Then ...
    cy.get('#create-hospital').should('be.visible');
    // And when ...
    cy.get('input#hospitalName').type("St Mary's Hospital");
    cy.get('input#hospitalCode').type((Math.floor(Math.random()*90000) + 10000).toString());
    cy.get('input#hospitalAddressNumberAndStreetName').type('Praed St');
    cy.get('input#hospitalAddressPostCode').type('W2 1NY');
    cy.get('input#hospitalAddressCity').type('London');
    cy.get('input#hospitalAddressCountry').type('United Kingdom');
    cy.get('input#hospitalGpsLatitude').type(47.5529216);
    cy.get('input#hospitalGpsLongitude').type(1.6187392);
    cy.get('select#hospitalMedicalSpecialities').select('Cardiologie');
    cy.get('input#nbEmergencyBedrooms').type(20);

    cy.get('.btn').contains('Valider').click();
    // Then ...
    cy.get('#create-hospital').should('contain.text', 'Nouvel hôpital créé');
    // And when ...
    cy.get('.btn').contains('Terminer').click();
    // Then ...
    cy.get('#create-hospital').should('not.exist');
  });

})
