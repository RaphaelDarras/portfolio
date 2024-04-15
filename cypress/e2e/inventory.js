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
  cy.get('body')
    .then(($body) => {
      if($body.find('[data-test=shopping-cart-badge]').length) {
        cy.get('[data-test=shopping-cart-badge]')
          .invoke('text')
          .then(cartBadgeText => {
            this.initialCartTotal = parseInt(cartBadgeText, 10)
          })
      } else {
        this.initialCartTotal = 0
      }
    })

  if(action === 'Add to cart') {
    cy.get('[data-test=shopping-cart-badge]')
      .should('not.exist')

    cy.addToCart(item)
        
    cy.get('[data-test=shopping-cart-badge]')
    .invoke('text')
    .then((cartBadgeText) => {
      this.newCartTotal = parseInt(cartBadgeText, 10)
    })
  } else {
    cy.addToCart(item)

    cy.get('[data-test=shopping-cart-badge]')
      .should('have.text', '1')

    cy.removeFromCart(item)
  }
})

Then("the cart total has been {string}", (variation) => {
  if(variation === 'increased') {
    expect(this.newCartTotal).to.equal(this.initialCartTotal+1)
  } else if( variation === 'decreased' && this.initialCartTotal != 0) {
    expect(this.newCartTotal).to.equal(this.initialCartTotal-1)
  } else {
    cy.get('[data-test=shopping-cart-badge]')
      .should('not.exist')
  }
})
