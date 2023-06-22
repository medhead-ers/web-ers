// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add('login', (username, password, expectFailing) => {
  if(username === undefined){
    username = Cypress.env('username')
  }

  if(password === undefined){
    password = Cypress.env('password')
  }
  cy.visit('/')

  cy.get('input[name=username]').type(username)
  cy.get('input[name=password]').type(password, { log: false })
  cy.get('button[type=submit]').click();

  cy.getAllSessionStorage('auth').should('exist');
  if(expectFailing === true){
    cy.url().should('include', '/login')
  }
  else {
    cy.url().should('include', '/dashboard')
  }
})
