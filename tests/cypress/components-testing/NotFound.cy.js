import NotFound from '/src/components/NotFound.vue'

describe('<NotFound />', () => {
  it('renders', () => {
    cy.mount(NotFound)
    cy.contains('Error 404 - Not found.').should('exist');
  })
})
