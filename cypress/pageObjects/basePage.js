export class BasePage {
  static click(selector) {
    cy.get(selector).click();
  }

  static type(selector, text) {
    cy.get(selector).type(text);
  }

  static hasText(selector, text) {
    cy.get(selector).should("have.text", text);
  }

  static doesNotExist(selector) {
    cy.get(selector).should("not.exist");
  }

  static isVisible(selector) {
    cy.get(selector).should("be.visible");
  }

  static cookieNotExist(name) {
    cy.getCookie(name).should("not.exist");
  }
}
