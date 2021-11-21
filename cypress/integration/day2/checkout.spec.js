import { LandingPage } from "../../pageObjects/pages/landingPage";
import { ProductsPage } from "../../pageObjects/pages/productsPage";
import { NavigationBar } from "../../pageObjects/components/navigationBar";
import { CheckoutPage } from "../../pageObjects/pages/checkoutPage";

context("Checkout test cases", () => {
  it("Add first item to the cart", () => {
    LandingPage.login("normal_user");
    ProductsPage.addFirstItemToCart();
    ProductsPage.verifyRemoveButton();
    NavigationBar.goToCart();
    CheckoutPage.verifyAddedItem();
  });

  it("Removing items from the cart", () => {
    CheckoutPage.setupForCartCases("normal_user", "[4,1,2,3,4]");
    CheckoutPage.removeAddedItems();
    CheckoutPage.verifyEmptyCart();
  });
});
