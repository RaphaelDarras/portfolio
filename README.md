# portfolio
The project has been created to show my technical skill to interested people.  
All tests written by Raphaël Darras.

## Technical Choices  

### End to End : Cypress  
I chose to use Cypress because this is the e2e framework I know the best.
I added a Cypress/Gherkin plugin to write scenarios with Gherkin syntax: I did it in the past but I knew the implementation had changed, so it was the occasion to show it to you and for me to update my knowledge of it.  

### API: Supertest
My knowledge of API testing and framework was pretty limited: I've used Postman in the past but not that much.
So I asked my friends in the tech world what would be a good framework to write API tests myself and Supertest came often in the answers.
It was fun to learn !

## Install Project
You need to have node.js and npm ready to use, then :
```
npm install
```
## Run the tests

### All the tests  
```
npm test
```

### API  
```
npm test:api
```

### E2E

To run headless tests, directly in terminal
```
npm test:e2e
```

To run the with Cypress desktop agent
```
npm test:e2e:open
```
