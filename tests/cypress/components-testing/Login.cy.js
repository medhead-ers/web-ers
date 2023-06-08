import Login from '/src/views/Login.vue'
import * as Auth from "@/utils/auth";

describe('<Login />', () => {
  it('renders', () => {
    cy.stub(Auth, 'loginUser').resolvesThis();
    cy.mount(Login);

    let username = Cypress.env('username');
    let password = Cypress.env('password');

    cy.get('input[name=username]').should('exist');
    cy.get('input[name=password]').should('exist');
    cy.get('button[type=submit]').should('exist');

    cy.get('input[name=username]').type(username);
    cy.get('input[name=password]').type(`${password}{enter}`, { log: false });
  })
})
