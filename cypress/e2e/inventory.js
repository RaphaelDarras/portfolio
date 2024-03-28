const {Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("I am logged as {string} user", (user) => {
    cy.fixture('credentials').then(credentials => {
      cy.login(credentials[user], 'secret_sauce')
    })
})

Then("I am on the inventory page", () => {
  cy.inventoryPageCheck()
})

Then("every inventory element is present and complete", () => {
  cy.get('[data-test=inventory-item]')
    .should('have.length', 6)
  cy.get('[data-test=inventory-item]')
    .eq(0)
    .then(element => {
      cy.get(element)
        .children('div.inventory_item_img')
        .children('a')
        .children('img.inventory_item_img')
        .should('have.attr','data-test','inventory-item-sauce-labs-backpack-img')
    })
})