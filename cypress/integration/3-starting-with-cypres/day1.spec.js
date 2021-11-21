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

});
