import { Page, expect } from '@playwright/test';

export class HomePage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Locators
    readonly homePageValidationLocator = () => this.page.locator(`span.title`);
    readonly cartIconLocator = () => this.page.locator(`//div[@id="shopping_cart_container"]`);
    readonly sauceLabsBackpackItemLocator = () => this.page.locator(`//a[@id="item_4_title_link"]//div`);
    readonly sauceLabsBackpackPriceLocator = () => this.page.locator(`.inventory_item_price`).nth(0);
    readonly addToCartButtonLocator = () => this.page.locator(`button#add-to-cart-sauce-labs-backpack`);

    //Methods
    /**
     * Validate the Home Page
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async validateHomePage() {
        await expect(this.homePageValidationLocator()).toBeVisible();
        await expect(this.page).toHaveURL(process.env.BASE_URL + "inventory.html");
    }

    /**
     * Add the Sauce Labs Backpack to the cart
     * by clicking the add to cart button.
     */
    async addSauceLabsBackpackToCart() {
        await expect(this.sauceLabsBackpackItemLocator()).toBeVisible();
        await this.addToCartButtonLocator().click();
    }

    /**
     * Navigate to the Cart Page
     * by clicking the cart icon.
     */
    async navigateToCartPage() {
        await expect(this.cartIconLocator()).toBeVisible();
        await this.cartIconLocator().click();
    }

    /**
     * Retrieve the Sauce Labs Backpack Item Name
     * by getting the text content of the sauce labs backpack item locator.
     * @RETURN string the name of the sauce labs backpack item
     */
    async retrieveSauceLabsBackpackItemName() {
        return await this.sauceLabsBackpackItemLocator().textContent() ?? "";
    }

    /**
     * Retrieve the Sauce Labs Backpack Item Price
     * by getting the text content of the sauce labs backpack price locator.
     * @RETURN string the price of the sauce labs backpack item
     */
    async retrieveSauceLabsBackpackItemPrice() {
        return await this.sauceLabsBackpackPriceLocator().textContent() ?? "";
    }
}