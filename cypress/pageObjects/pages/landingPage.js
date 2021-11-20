import { BasePage } from "../basePage";

//Custom attribute made for testing - Best CSS selector
const USERNAME_FIELD = "[data-test=username]";
//ID - 2nd to best, since they have to be unique
const PASSWORD_FIELD = "#password";
//Class selector - Not the best way, but life is harsh , so might need to use it
const LOGIN_BUTTON = ".submit-button";
const LOGIN_COOKIE_NAME = "session-username";

export class LandingPage extends BasePage {
  static login(username) {
    cy.visit("https://www.saucedemo.com/");
    this.type(USERNAME_FIELD, username);
    this.type(PASSWORD_FIELD, "secret_sauce");
    this.click(LOGIN_BUTTON);
  }

  static verifyLoginFields() {
    this.isVisible(USERNAME_FIELD);
    this.isVisible(PASSWORD_FIELD);
  }

  static verifyEmptyLoginCookies() {
    this.cookieNotExist(LOGIN_COOKIE_NAME);
  }
}
