import { Page, expect } from "@playwright/test";

export class CheckoutStepTwoPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly url = process.env.BASE_URL + "checkout-step-two.html";

    //Locators
    readonly checkoutStepTwoPageValidationLocator = () => this.page.locator(`//span[@data-test="title"]`);
    readonly itemNameLocator = () => this.page.locator(`//div[@class="inventory_item_name"]`);
    readonly itemPriceLocator = () => this.page.locator(`//div[@class="inventory_item_price"]`);
    readonly itemQuantityLocator = () => this.page.locator(`//div[@class="cart_quantity"]`);
    readonly finishButtonLocator = () => this.page.locator(`//button[@id="finish"]`);
    readonly cancelButtonLocator = () => this.page.locator(`//button[@data-test="cancel"]`);

    readonly paymentInformationLocator = () => this.page.locator(`//div[@data-test="payment-info-label"]`);
    readonly paymentInformationValueLocator = () => this.page.locator(`//div[@data-test="payment-info-value"]`);
    readonly shippingInformationLocator = () => this.page.locator(`//div[@data-test="shipping-info-label"]`);
    readonly shippingInformationValueLocator = () => this.page.locator(`//div[@data-test="shipping-info-value"]`);
    readonly priceInformationLocator = () => this.page.locator(`//div[@data-test="total-info-label"]`);
    readonly priceInformationValueLocator = () => this.page.locator(`//div[@data-test="subtotal-label"]`);

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

    /**
     * Click the cancel button in the checkout step two page
     * by clicking the cancel button.
     */
    async clickCancelButton() {
        await expect(this.cancelButtonLocator()).toBeVisible();
        await this.cancelButtonLocator().click();
        await expect(this.page).toHaveURL(process.env.BASE_URL + "inventory.html");
    }

    /**
     * Validate element in the Checkout Sep Two Page
     */
    async validateCheckoutStepTwoPageElements() {
        await expect(this.paymentInformationLocator()).toBeVisible();
        await expect(this.paymentInformationValueLocator()).toBeVisible();
        await expect(this.paymentInformationValueLocator()).toContainText("SauceCard #31");
        await expect(this.shippingInformationLocator()).toBeVisible();
        await expect(this.shippingInformationValueLocator()).toBeVisible();
        await expect(this.shippingInformationValueLocator()).toContainText("Free Pony Express Delivery!");
        await expect(this.priceInformationLocator()).toBeVisible();
        await expect(this.priceInformationValueLocator()).toBeVisible();
        await expect(this.priceInformationValueLocator()).toContainText("Item total:");
    }

    /**
     * Open the checkout step two page directly
     * by navigating to the checkout step two page URL.
     */
    async openCheckoutStepTwoPageDirectly() {
        await this.page.goto(this.url);
    }
}