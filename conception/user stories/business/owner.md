As a restaurant owner,
I want to create a business account for my restaurant's booking system,
So that I can manage reservations and related activities efficiently.

## Acceptance Criteria:

- When creating a business account, I should provide the following details: business name, full address, phone number, and email address.

- The system should validate that the email address is unique and not already associated with another business account (this validation will be done by a cloud function in the back end so make sure to set up a http request to the function).

- Upon successful creation, the business account should be active and ready for use.

- As part of the business account setup, I should be prompted to create a super user by providing the following details of the super user account: full name, email, and password.

- The super user account should have the necessary permissions to manage the restaurant's booking system.

Note: The business account creation process includes both the basic business information and the subsequent creation of an admin account for system management.