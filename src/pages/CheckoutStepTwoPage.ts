import { Page, expect } from "@playwright/test";
import { logger } from "../utils/logger";

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
        try {
            await expect(this.checkoutStepTwoPageValidationLocator()).toBeVisible();
            await expect(this.page).toHaveURL(process.env.BASE_URL + "checkout-step-two.html");
            logger.info("Checkout step two page validated successfully");
        }
        catch (error) {
            logger.error(`Checkout step two page validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the item details in the checkout step two page
     * by checking if the item name, item price and item quantity are visible.
     * @PARAM itemName the name of the item
     * @PARAM itemPrice the price of the item
     * @PARAM itemQuantity the quantity of the item
     */
    async validateItemDetails(itemName: string, itemPrice: string, itemQuantity: string) {
        try {
            await expect(this.itemNameLocator()).toHaveText(itemName);
            await expect(this.itemPriceLocator()).toHaveText(itemPrice);
            await expect(this.itemQuantityLocator()).toHaveText(itemQuantity);
            logger.info("Item details validated successfully");
        }
        catch (error) {
            logger.error(`Item details validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Click the finish button in the checkout step two page
     * by clicking the finish button.
     */
    async clickFinishButton() {
        try {
            await expect(this.finishButtonLocator()).toBeVisible();
            await this.finishButtonLocator().click();
            logger.info("Finish button clicked successfully");
        }
        catch (error) {
            logger.error(`Finish button click failed: ${error}`);
            throw error;
        }
    }

    /**
     * Click the cancel button in the checkout step two page
     * by clicking the cancel button.
     */
    async clickCancelButton() {
        try {
            await expect(this.cancelButtonLocator()).toBeVisible();
            await this.cancelButtonLocator().click();
            await expect(this.page).toHaveURL(process.env.BASE_URL + "inventory.html");
            logger.info("Cancel button clicked successfully");
        }
        catch (error) {
            logger.error(`Cancel button click failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate element in the Checkout Sep Two Page
     */
    async validateCheckoutStepTwoPageElements() {
        try {
            await expect(this.paymentInformationLocator()).toBeVisible();
            await expect(this.paymentInformationValueLocator()).toBeVisible();
            await expect(this.paymentInformationValueLocator()).toContainText("SauceCard #31");
            await expect(this.shippingInformationLocator()).toBeVisible();
            await expect(this.shippingInformationValueLocator()).toBeVisible();
            await expect(this.shippingInformationValueLocator()).toContainText("Free Pony Express Delivery!");
            await expect(this.priceInformationLocator()).toBeVisible();
            await expect(this.priceInformationValueLocator()).toBeVisible();
            await expect(this.priceInformationValueLocator()).toContainText("Item total:");
            logger.info("Checkout step two page elements validated successfully");
        }
        catch (error) {
            logger.error(`Checkout step two page elements validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Open the checkout step two page directly
     * by navigating to the checkout step two page URL.
     */
    async openCheckoutStepTwoPageDirectly() {
        try {
            await this.page.goto(this.url);
            logger.info("Checkout step two page opened successfully");
        }
        catch (error) {
            logger.error(`Checkout step two page opened failed: ${error}`);
            throw error;
        }
    }
}