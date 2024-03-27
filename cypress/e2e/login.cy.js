describe('Login spec', () => {

  it('Log with standard user', () => {
    cy.visit('/')

    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.get('#header_container')
    cy.get('#inventory_container')
  })

  it('Log with locked out user', () => {
    cy.visit('/')

    cy.get('#user-name').type('locked_out_user')
    cy.get('#password').type('secret_sauce')
    cy.get('.error-message-container').should('not.have.class','error')
    cy.get('#login-button').click()

    cy.get('.error-message-container').should('have.class','error')
    cy.get('[data-test=error]').should('have.text','Epic sadface: Sorry, this user has been locked out.')
  })

})