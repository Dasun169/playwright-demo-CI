import { Page, expect } from "@playwright/test";

export class CheckoutStepTwoPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Locators
    readonly checkoutStepTwoPageValidationLocator = () => this.page.locator(`//span[@data-test="title"]`);
    readonly itemNameLocator = () => this.page.locator(`//div[@class="inventory_item_name"]`);
    readonly itemPriceLocator = () => this.page.locator(`//div[@class="inventory_item_price"]`);
    readonly itemQuantityLocator = () => this.page.locator(`//div[@class="cart_quantity"]`);
    readonly finishButtonLocator = () => this.page.locator(`//button[@id="finish"]`);

    //Methods
    /**
     * Validate the Checkout Step Two Page
     * by checking if the checkout step two page validation locator is visible and the url contains the checkout step two page.
     */
    async validateCheckoutStepTwoPage() {
        await expect(this.checkoutStepTwoPageValidationLocator()).toBeVisible();
        await expect(this.page).toHaveURL(process.env.BASE_URL + "checkout-step-two.html");
    }  

    /**
     * Validate the item details in the checkout step two page
     * by checking if the item name, item price and item quantity are visible.
     * @PARAM itemName the name of the item
     * @PARAM itemPrice the price of the item
     * @PARAM itemQuantity the quantity of the item
     */
    async validateItemDetails(itemName: string, itemPrice: string, itemQuantity: string) {
        await expect(this.itemNameLocator()).toHaveText(itemName);
        await expect(this.itemPriceLocator()).toHaveText(itemPrice);
        await expect(this.itemQuantityLocator()).toHaveText(itemQuantity);
    }

    /**
     * Click the finish button in the checkout step two page
     * by clicking the finish button.
     */
    async clickFinishButton() {
        await expect(this.finishButtonLocator()).toBeVisible();
        await this.finishButtonLocator().click();
    }
}