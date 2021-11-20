import { LandingPage } from "../../pageObjects/pages/landingPage";
import { NavigationBar } from "../../pageObjects/components/navigationBar";
import { ProductsPage } from "../../pageObjects/pages/productsPage";
import { CheckoutPage } from "../../pageObjects/pages/checkoutPage";

//Example of Unit tests
//Example of Application code
function fizzBuzz(number) {
  if (number % 3 === 0 && number % 5 === 0) {
    return "fizzbuzz";
  }
  if (number % 3 === 0) {
    return "fizz";
  }
  if (number % 5 === 0) {
    return "buzz";
  }
  return "Not a multiple of 3 or 5";
}

function numsExpectedToEq(array, expected) {
  array.forEach((number) => {
    expect(fizzBuzz(number)).to.eq(expected);
  });
}

//Cypress tests
describe("First day unit test cases", () => {
  it("Returns fizz if number is a multiple of 3", () => {
    numsExpectedToEq([3, 6, 9, 12], "fizz");
  });

  it("Returns buzz if the number is a multiple of 5 ", () => {
    numsExpectedToEq([5, 10, 20], "buzz");
  });

  it("Returns fizzbuzz if the number is a multiple of 3 and 5", () => {
    numsExpectedToEq([15, 30, 60], "fizzbuzz");
  });
});

describe.only("First day E2E test cases", () => {
  //Hooks
  before(() => {
    cy.log("Running once before the test cases");
  });

  beforeEach(() => {
    cy.log("Running before each test case");
  });

  after(() => {
    cy.log("Running only once after the test cases");
  });

  afterEach(() => {
    cy.log("Runs after each test case");
  });

  function normalLogin() {
    cy.visit("https://www.saucedemo.com/");
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
    cy.visit("https://www.saucedemo.com/inventory.html", {
      failOnStatusCode: false,
    });
  });

  it("Login functionality", () => {
    LandingPage.login("standard_user");
    NavigationBar.logout();
    LandingPage.verifyLoginFields();
    LandingPage.verifyEmptyLoginCookies();
  });

  it("Add first item to the cart", () => {
    LandingPage.login("standard_user");
    ProductsPage.addFirstItemToCart();
    ProductsPage.verifyRemoveButton();
    NavigationBar.goToCart();
    CheckoutPage.verifyAddedItem();
  });

  it.only("Removing items from the cart", () => {
    CheckoutPage.setupForCartCases("standard_user", "[4,1,2,3,4]");
    CheckoutPage.removeAddedItems();
    CheckoutPage.verifyEmptyCart();
  });
});
