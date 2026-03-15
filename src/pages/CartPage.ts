import { Page, expect } from '@playwright/test';

export class CartPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly url = process.env.BASE_URL + 'cart.html';

    //Locators
    readonly cartPageValidationLocator = () => this.page.locator(`span.title`);
    readonly itemNameLocator = () => this.page.locator(`div.inventory_item_name`);
    readonly itemPriceLocator = () => this.page.locator(`div.inventory_item_price`);
    readonly itemRemoveButtonLocator = () => this.page.locator(`button.btn.btn_secondary.btn_small.cart_button`);
    readonly checkoutButtonLocator = () => this.page.locator(`button#checkout`);

    //Methods
    async validateCartPage() {
        await expect(this.cartPageValidationLocator()).toHaveText('Your Cart');
        await expect(this.page).toHaveURL(process.env.BASE_URL + "cart.html");
    }

    async validateItemDetails(itemName: string, itemPrice: string) {
        try {
            await expect(this.itemNameLocator()).toHaveText(itemName);
            await expect(this.itemPriceLocator()).toHaveText(itemPrice);
        }
        catch (error) {
            throw new Error(`Item name does not match: ${error}`);
        }
    }

    async clickOnCheckoutButton() {
        await this.checkoutButtonLocator().click();
    }
}