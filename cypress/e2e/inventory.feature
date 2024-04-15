Feature: Inventory

    Background: Log as standard user
    	Given I am logged as 'standard' user


	Scenario: Inventory is complete
		When I am on the inventory page
		Then every inventory item is present and complete

	Scenario: Add an item to the cart
		When I click on the 'Add to cart' button of the 'Sauce Labs Backpack'
		Then the cart total has been 'increased'

	Scenario: Remove an item from the cart
		When I click on the 'Remove' button of the 'Sauce Labs Backpack'
		Then the cart total has been 'decreased'
