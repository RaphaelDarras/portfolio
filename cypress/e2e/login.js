const {Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("I am on the login page", () => {
  cy.visit('/')
})

When("I enter the {string} user credentials", (user) => {
  cy.fixture('credentials').then(credentials => {
    cy.login(credentials[user], 'secret_sauce')
  })
})

Then("I am on the inventory page", () => {
  cy.inventoryPageCheck()
})

Then("I see an error message on the login page", () => {
  cy.url().should('not.include', 'inventory.html')
  cy.get('.error-message-container').should('have.class','error')
  cy.get('[data-test=error]').should('have.text','Epic sadface: Sorry, this user has been locked out.')
})