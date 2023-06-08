import EmergenciesTable from '/src/components/EmergenciesTable.vue'
describe('<EmergenciesTable />', () => {
  it('renders', () => {
    cy.mount(EmergenciesTable)
    cy.get('b-table').should('exist');
  })
})
