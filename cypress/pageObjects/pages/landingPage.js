import { BasePage } from "../basePage";

//Custom attribute made for testing - Best CSS selector
const USERNAME_FIELD = "[data-test=username]";
//ID - 2nd to best, since they have to be unique
const PASSWORD_FIELD = "#password";
//Class selector - Not the best way, but life is harsh , so might need to use it
const LOGIN_BUTTON = ".submit-button";
const LOGIN_COOKIE_NAME = "session-username";
const LOGIN_ERROR = "[data-test=error]"

export class LandingPage extends BasePage {
  static login(user) {
    cy.visit("/");
    cy.fixture("testUsers.json").then((fixture) => {
      this.type(USERNAME_FIELD, fixture[user].username);
      this.type(PASSWORD_FIELD, fixture[user].password);
    })
    this.click(LOGIN_BUTTON);
  }

  static verifyLoginFields() {
    this.isVisible(USERNAME_FIELD);
    this.isVisible(PASSWORD_FIELD);
  }

  static verifyEmptyLoginCookies() {
    this.cookieNotExist(LOGIN_COOKIE_NAME);
  }

  static verifyLockedUserError() {
    this.hasText(LOGIN_ERROR,"Epic sadface: Sorry, this user has been locked out.")
  }
}
