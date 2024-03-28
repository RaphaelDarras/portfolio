Feature: Inventory

    Background: Log as standard user
    	Given I am logged as 'standard' user


	Scenario: Inventory is complete
		When I am on the inventory page
		Then every inventory element is present and complete
