const {Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("I am logged as {string} user", (user) => {
    cy.fixture('credentials').then(credentials => {
      cy.login(credentials[user], 'secret_sauce')
    })
})

Then("I am on the inventory page", () => {
  cy.inventoryPageCheck()
})

Then("every inventory item is present and complete", () => {
  cy.get('[data-test=inventory-item]')
    .should('have.length', 6)
  cy.inventoryItemCheck(0)
  cy.inventoryItemCheck(1)
  cy.inventoryItemCheck(2)
  cy.inventoryItemCheck(3)
  cy.inventoryItemCheck(4)
  cy.inventoryItemCheck(5)  
})

When("I click on the {string} button of the {string}", (action, item) => {
  if(action === 'Add to cart') {
    cy.get('[data-test=shopping-cart-badge]')
      .should('not.exist')

    cy.addToCart(item)
    
    cy.get('[data-test=shopping-cart-badge]')
    .invoke('text')
    .then((cartBadgeValue) => {
      this.cartTotal = cartBadgeValue
    })
  } else {
    cy.addToCart(item)

    cy.get('[data-test=shopping-cart-badge]')
      .should('have.text', '1')

    cy.removeFromCart(item)
  }
})

Then("the cart total has been {string}", (variation) => {
  variation === 'increased' ?
    expect(this.cartTotal).to.equal('1') :
    cy.get('[data-test=shopping-cart-badge]')
      .should('not.exist')
})
