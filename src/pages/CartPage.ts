import { Page, expect } from '@playwright/test';
import { logger } from '../utils/logger';

export class CartPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly url = process.env.BASE_URL + 'cart.html';

    //Locators
    readonly cartPageValidationLocator = () => this.page.locator(`span.title`);
    readonly cartItemCatchLocator = () => this.page.locator(`//div[@class="cart_item"]`);
    readonly itemNameLocator = () => this.page.locator(`div.inventory_item_name`);
    readonly itemPriceLocator = () => this.page.locator(`div.inventory_item_price`);
    readonly itemRemoveButtonLocator = () => this.page.locator(`//button[@data-test="remove-sauce-labs-backpack"]`);
    readonly checkoutButtonLocator = () => this.page.locator(`button#checkout`);
    readonly continueShoppingButtonLocator = () => this.page.locator(`//button[@data-test="continue-shopping"]`);

    //Methods
    /**
     * Validate the cart page
     * by checking if the cart page validation locator is visible.
     */
    async validateCartPage() {
        await expect(this.cartPageValidationLocator()).toHaveText('Your Cart');
        await expect(this.page).toHaveURL(process.env.BASE_URL + "cart.html");
        logger.info("Cart page validated successfully");
    }

    /**
     * Open the cart page directly
     * by navigating to the cart page URL.
     */
    async openCartPageDirectly() {
        await this.page.goto(this.url);
    }

    /**
     * Validate the item details
     * by checking if the item name and item price locators are visible.
     */
    async validateItemDetails(itemName: string, itemPrice: string) {
        try {
            await expect(this.itemNameLocator()).toHaveText(itemName);
            await expect(this.itemPriceLocator()).toHaveText(itemPrice);
        }
        catch (error) {
            throw new Error(`Item name does not match: ${error}`);
        }
    }

    /**
     * by clicking the checkout button locator.
     */
    async clickOnCheckoutButton() {
        await this.checkoutButtonLocator().click();
        logger.info("Checkout button clicked successfully");
    }

    /**
     * Validate the continue shopping button
     * by checking if the continue shopping button locator is visible.
     */
    async continueShoppingButtonValidation() {
        await expect(this.continueShoppingButtonLocator()).toBeVisible();
        await this.continueShoppingButtonLocator().click();
        await expect(this.page).toHaveURL(process.env.BASE_URL + "inventory.html");
        logger.info("Continue shopping button validated successfully");
    }

    /**
     * Remove item from cart
     * by clicking the remove button locator.
     */
    async removeItemFromCart() {
        let count = await this.cartItemCatchLocator().count();
        await this.itemRemoveButtonLocator().click();
        await expect(this.cartItemCatchLocator()).toHaveCount(count - 1);
        logger.info("Item removed from cart successfully");
    }
}