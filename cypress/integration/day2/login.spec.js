import { LandingPage } from "../../pageObjects/pages/landingPage";
import { NavigationBar } from "../../pageObjects/components/navigationBar";

describe("Login Test cases", () => {
  before(() => {
    cy.request(
      "POST",
      "https://discord.com/api/webhooks/911928386681720842/t3q2LAjy2lU-rMw2qtvd1pwWnuSChnfKrWAMESBQKWVVmAWhLPh4xQ1ZXG5fWcoVIPP5",
      {
        content: "Starting login cases"
      }
    );
  });

  after(() => {
    cy.request(
        "POST",
        "https://discord.com/api/webhooks/911928386681720842/t3q2LAjy2lU-rMw2qtvd1pwWnuSChnfKrWAMESBQKWVVmAWhLPh4xQ1ZXG5fWcoVIPP5",
        {
          content: "Ended login cases"
        }
    );
  })

  function normalLogin() {
    cy.visit("/");
    //Custom attribute made for testing - Best CSS selector
    cy.get("[data-test=username]").type("standard_user");
    //ID - 2nd to best, since they have to be unique
    cy.get("#password").type("secret_sauce");
    //Class selector - Not the best way, but life is harsh , so might need to use it
    cy.get(".submit-button").click();
    cy.get(".header_secondary_container").should("be.visible");
  }

  it("Logging in with standard user", () => {
    normalLogin();
    cy.getCookie("session-username").then((cookie) => {
      expect(cookie.value).to.eq("standard_user");
    });
  });

  it("Logging in with a standart user on mobile viewport", () => {
    cy.viewport("iphone-6");
    cy.normalLogin("standard_user");
  });

  it("Testing autoscroll", () => {
    cy.viewport("iphone-6");
    cy.normalLogin("standard_user");
    cy.get("[data-test*=add-to-cart]").last().scrollIntoView();
  });

  it("Starting test case already logged in", () => {
    cy.setLoginCookies("standard_user");
    cy.visit("/inventory.html", {
      failOnStatusCode: false,
    });
  });

  it.only("Login functionality", () => {
    LandingPage.login("normal_user");
    NavigationBar.logout();
    LandingPage.verifyLoginFields();
    LandingPage.verifyEmptyLoginCookies();
  });

  it.only("Trying to log in with a locked out user", () => {
    LandingPage.login("locked_user");
    LandingPage.verifyLockedUserError();
  });
});
