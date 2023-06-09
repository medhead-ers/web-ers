import App from '/src/App.vue'

describe('<App />', () => {
  it('renders', () => {
    cy.mount(App);
    cy.get('router-view').should('exist');
  })
})
