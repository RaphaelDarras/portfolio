const {Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("I am logged as {string} user", (user) => {
  //  A cy.session could be used here to improve execution speed in these tests
    cy.fixture('credentials').then(credentials => {
      cy.login(credentials[user], 'secret_sauce')
    })
})

Then("I am on the inventory page", () => {
  cy.inventoryPageCheck()
})

Then("every inventory item is present and complete", () => {
  // The amount of item is hard coded, but in cases where we have access to the requests
  // it is possible to use a combination of cy.intercept/cy.wait to
  // access the content of the response and make this check dynamic
  cy.get('[data-test=inventory-item]')
    .should('have.length', 6)
  // Custom commands used to avoid code repetition
  // cy.get('[data-test=inventory-item]') return a list of DOM elements
  // Number passed to the command is used to focus on a specific DOM element
  cy.inventoryItemCheck(0)
  cy.inventoryItemCheck(1)
  cy.inventoryItemCheck(2)
  cy.inventoryItemCheck(3)
  cy.inventoryItemCheck(4)
  cy.inventoryItemCheck(5)  
})

// Stepd definition with several dynamic values
When("I click on the {string} button of the {string}", (action, item) => {

  // Before going further into the test, we need to store the initial value of the cart
  cy.get('body')
    .then(($body) => {
      // If there is nothing in the cart, the badge DOM element does not exist
      if($body.find('[data-test=shopping-cart-badge]').length) {
        cy.get('[data-test=shopping-cart-badge]')
          .invoke('text')
          .then(cartBadgeText => {
            // this.value allows you to make a variable available through the whole file
            // and use them within all step definitions
            this.initialCartTotal = parseInt(cartBadgeText, 10)
          })
      } else {
        this.initialCartTotal = 0
      }
    })

  if(action === 'Add to cart') {
    // This step could be improved for reusability and be less specific to the current scenario
    cy.get('[data-test=shopping-cart-badge]')
      .should('not.exist')

    cy.addToCart(item)
        
    cy.get('[data-test=shopping-cart-badge]')
    .invoke('text')
    .then((cartBadgeText) => {
      // Storing new cart total to make comparison
      this.newCartTotal = parseInt(cartBadgeText, 10)
    })
  } else {
    // This step could be improved for reusability and be less specific to the current scenario
    cy.addToCart(item)

    cy.get('[data-test=shopping-cart-badge]')
      .should('have.text', '1')

    cy.removeFromCart(item)
  }
})

Then("the cart total has been {string}", (variation) => {
  if(variation === 'increased') {
    // Comparison used with values from previous step passed through 'this'
    expect(this.newCartTotal).to.equal(this.initialCartTotal+1)
  } else if( variation === 'decreased' && this.initialCartTotal != 0) {
    expect(this.newCartTotal).to.equal(this.initialCartTotal-1)
  } else {
    cy.get('[data-test=shopping-cart-badge]')
      .should('not.exist')
  }
})
