const {Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("I am on the login page", () => {
  cy.visit('/')
})

When("I enter the standard user credentials", () => {
  cy.login('standard_user', 'secret_sauce')
})

Then("I am on the inventory page", () => {
  cy.url().should('include', 'inventory.html')
  cy.get('#header_container')
  cy.get('#inventory_container')
})

When("I enter the locked out user credentials", () => {
  cy.login('locked_out_user', 'secret_sauce')
})

Then("I see an error message on the login page", () => {
  cy.url().should('not.include', 'inventory.html')
  cy.get('.error-message-container').should('have.class','error')
  cy.get('[data-test=error]').should('have.text','Epic sadface: Sorry, this user has been locked out.')
})