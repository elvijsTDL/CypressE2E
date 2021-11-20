import { BasePage } from "../basePage";

const BURGER_MENU_BUTTON = "#react-burger-menu-btn";
const LOGOUT_BUTTON = "#logout_sidebar_link";
const NAVIGATION_BAR = ".shopping_cart_link";

export class NavigationBar extends BasePage {
  static logout() {
    this.click(BURGER_MENU_BUTTON);
    this.click(LOGOUT_BUTTON);
  }

  static goToCart() {
    this.click(NAVIGATION_BAR);
  }
}
