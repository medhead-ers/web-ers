import HospitalsTable from '/src/components/HospitalsTable.vue'
describe('<HospitalsTable />', () => {
  it('renders', () => {
    cy.mount(HospitalsTable)
    cy.get('b-table').should('exist');
  })
})
