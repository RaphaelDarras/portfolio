describe('Login spec', () => {
  it('Log with standard user', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.get('#header_container')
    cy.get('#inventory_container')
  })
})