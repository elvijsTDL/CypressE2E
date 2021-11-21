import {LandingPage} from "../../pageObjects/pages/landingPage";
import {ProductsPage} from "../../pageObjects/pages/productsPage";

context("Products page test cases" , () => {

    beforeEach(()=>{
        LandingPage.login("normal_user")
    })

    it("Sorting the products list by price - low to high" , () => {
        ProductsPage.sortProductsBy("lohi")
        ProductsPage.verifyLowToHighPrices()
    })

    it("Sorting the products list by price - low to high" , () => {
        ProductsPage.sortProductsBy("hilo")
        ProductsPage.verifyHighToLowPrices()
    })
})