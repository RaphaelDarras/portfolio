describe('Login spec', () => {
  
  beforeEach(() => {
    cy.visit('/')
  })


  it('Log with standard user', () => {
    cy.login('standard_user', 'secret_sauce')

    cy.get('#header_container')
    cy.get('#inventory_container')
  })

  it('Log with locked out user', () => {
    cy.get('.error-message-container').should('not.have.class','error')

    cy.login('locked_out_user', 'secret_sauce')

    cy.get('.error-message-container').should('have.class','error')
    cy.get('[data-test=error]').should('have.text','Epic sadface: Sorry, this user has been locked out.')
  })

})