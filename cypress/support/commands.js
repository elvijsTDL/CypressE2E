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

Cypress.Commands.add("setLoginCookies" , (user) => {
    cy.setCookie("session-username" , user )
})

Cypress.Commands.add("setAddedItems" , (idArray) => {
    window.localStorage.setItem("cart-contents" , idArray)
})

Cypress.Commands.add("normalLogin" , (user) => {
    cy.visit("/");
    //Custom attribute made for testing - Best CSS selector
    cy.get("[data-test=username]").type(user);
    //ID - 2nd to best, since they have to be unique
    cy.get("#password").type("secret_sauce");
    //Class selector - Not the best way, but life is harsh , so might need to use it
    cy.get(".submit-button").click();
    cy.get(".header_secondary_container").should("be.visible");
})
