// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/')
    cy.get('#user-name')
      .should('have.value','')
      .type(email)
      .should('have.value', email)
    cy.get('#password')
      .should('have.value','')
      .type(password)
      .should('have.value', password)
    cy.get('#login-button')
      .should('have.value','Login')
      .click()
})

Cypress.Commands.add('inventoryPageCheck', () => {
  cy.url().should('include', 'inventory.html')
  cy.get('#header_container')
  cy.get('#inventory_container')
})

Cypress.Commands.add('inventoryItemCheck', (index) => {
  cy.get('[data-test=inventory-item]')
    .eq(index)
    .then(item => {
      cy.inventoryItemNameCheck(index, item)
      cy.inventoryItemImgCheck(index, item)
      cy.inventoryItemPriceCheck(index, item)
      cy.inventoryItemButtonCheck(item)
    })
})

Cypress.Commands.add('inventoryItemNameCheck', (index, item) => {
  cy.fixture('inventoryItems').then(inventoryItems => {
    cy.get(item)
      .children('[data-test="inventory-item-description"]')
      .children('div.inventory_item_label')
      .children('a')
      .children('[data-test="inventory-item-name"]')
      .should('have.text', inventoryItems.list[index].nameText)
  })
})

Cypress.Commands.add('inventoryItemImgCheck', (index, item) => {
  cy.fixture('inventoryItems').then(inventoryItems => {
    cy.get(item)
      .children('div.inventory_item_img')
      .children('a')
      .children('img.inventory_item_img')
      .should('have.attr','data-test', inventoryItems.list[index].imgDataTest)
  })
})

Cypress.Commands.add('inventoryItemPriceCheck', (index, item) => {
  cy.fixture('inventoryItems').then(inventoryItems => {
    cy.get(item)
      .children('[data-test="inventory-item-description"]')
      .children('div.pricebar')
      .children('[data-test="inventory-item-price"]')
      .should('have.text', inventoryItems.list[index].price)
  })
})

Cypress.Commands.add('inventoryItemButtonCheck', (item) => {
  cy.get(item)
    .children('[data-test="inventory-item-description"]')
    .children('div.pricebar')
    .children('button')
    .should('have.text', 'Add to cart')
})

Cypress.Commands.add('addToCart', (item) => {
  cy.get('div.inventory_item_name ').contains(item)
    .parent('a')
    .parent('div.inventory_item_label')
    .siblings('div.pricebar')
    .children('button')
    .should('have.text', 'Add to cart')
    .click()
})

Cypress.Commands.add('removeFromCart', (item) => {
  cy.get('div.inventory_item_name ').contains(item)
    .parent('a')
    .parent('div.inventory_item_label')
    .siblings('div.pricebar')
    .children('button')
    .should('have.text', 'Remove')
    .click()
})