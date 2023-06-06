import PatientsTable from '/src/components/PatientsTable.vue'
describe('<PatientsTable />', () => {
  it('renders', () => {
    cy.mount(PatientsTable)
    cy.get('b-table').should('exist');
  })
})
