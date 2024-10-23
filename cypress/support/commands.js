Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (firstName, lastName, email, description) => {
    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type(description, {delay:0})
    cy.get('button[type="submit"]').click()

})