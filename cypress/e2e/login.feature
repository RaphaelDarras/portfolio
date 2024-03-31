Feature: Login
# First standard scenario with happy path
	Scenario: Log as standard user
		Given I am on the login page
		# Writing the standard with quotes here allows to have dynamic step definition in the .js file
		When I enter the 'standard' user credentials
		Then I am on the inventory page

# Second scenario where Given and When steps have been reused
	Scenario: Log as locked out user
		Given I am on the login page
		When I enter the 'locked out' user credentials
		Then I see an error message on the login page

#  Batch of scenarios with all reused steps
	Scenario: Log as valid users
		Given I am on the login page
		# Usage of quotes and <> allows you to iterate through a list of examples
		When I enter the '<userType>' user credentials
		Then I am on the inventory page

# List of examples used for the test. For each value we will have an execution of the test
	Examples:
		| userType |
		| standard |
		| problem |
		| performance glitch |
		| error |
		| visual |