import { BasePage } from "../basePage";

const PRODUCT_NAMES = ".inventory_item_name";
const ADD_TO_CART_BUTTONS = ".inventory_item_price + .btn";
const SORTING_DROPDOWN = "[data-test=product_sort_container]"
const PRODUCT_PRICES = ".inventory_item_price"

export class ProductsPage extends BasePage {
  static addFirstItemToCart() {
    cy.get(PRODUCT_NAMES)
      .first()
      .then((element) => {
        cy.wrap(element.text()).as("addedProductName");
      });
    cy.get(ADD_TO_CART_BUTTONS).first().click();
  }

  static verifyRemoveButton() {
    cy.get(ADD_TO_CART_BUTTONS)
      .first()
      .should("have.text", "Remove")
      .and("have.css", "color", "rgb(71, 76, 85)");
  }

  static sortProductsBy(option) {
    this.selectOption(SORTING_DROPDOWN,option)
  }

  static verifyLowToHighPrices(){
    let priceArray = []
    cy.get(PRODUCT_PRICES).each((product)=>{
      priceArray.push(product.text().replace("$",""))
    })
    cy.wrap(priceArray).then((array) => {
      let expectedArray = [...array].sort((a,b) => a-b)
      expect(array).to.deep.eq(expectedArray)
    })
  }

  static verifyHighToLowPrices(){
    let priceArray = []
    cy.get(PRODUCT_PRICES).each((product)=>{
      priceArray.push(product.text().replace("$",""))
    })
    cy.wrap(priceArray).then((array) => {
      let expectedArray = [...array].sort((a,b) => b-a)
      expect(array).to.deep.eq(expectedArray)
    })
  }
}
