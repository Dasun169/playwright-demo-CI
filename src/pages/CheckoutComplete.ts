import { Page, expect } from "@playwright/test";
import { logger } from "../utils/logger";

export class CheckoutComplete {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly url = process.env.BASE_URL + "checkout-complete.html";

    //Locators
    readonly checkoutCompletePageValidationLocator = () => this.page.locator(`//span[@data-test="title"]`);
    readonly backToHomeButtonLocator = () => this.page.locator(`//button[@id="back-to-products"]`);
    readonly thankYouMessageLocator = () => this.page.locator(`//h2[@data-test="complete-header"]`);
    readonly completeTextMessageLocator = () => this.page.locator(`//div[@data-test="complete-text"]`);

    //Methods
    /**
     * Validate the Checkout Complete Page
     * by checking if the checkout complete page validation locator is visible and the url contains the checkout complete page.
     */
    async validateCheckoutCompletePage() {
        await expect(this.checkoutCompletePageValidationLocator()).toBeVisible();
        await expect(this.page).toHaveURL(process.env.BASE_URL + "checkout-complete.html");
        await expect(this.thankYouMessageLocator()).toBeVisible();
        logger.info("Checkout complete page validated successfully");
    }

    /**
     * Click the back to home button in the checkout complete page
     * by clicking the back to home button.
     */
    async clickBackToHomeButton() {
        await expect(this.backToHomeButtonLocator()).toBeVisible();
        await this.backToHomeButtonLocator().click();
        logger.info("Back to home button clicked successfully");
    }

    /**
     * Validate the checkout complete page element visibility
     * by checking if the checkout complete page validation locator, back to home button, thank you message and complete text locators are visible.
     */
    async checkoutComplatePageElementValidation() {
        try {
            await expect(this.checkoutCompletePageValidationLocator()).toBeVisible();
            await expect(this.backToHomeButtonLocator()).toBeVisible();
            await expect(this.thankYouMessageLocator()).toBeVisible();
            await expect(this.thankYouMessageLocator()).toHaveText("Thank you for your order!");
            await expect(this.completeTextMessageLocator()).toBeVisible();
            await expect(this.completeTextMessageLocator()).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
            logger.info("Checkout complete page element validation successful");
        }
        catch (error) {
            logger.error(`Checkout complete page element validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Open the checkout complete page directly
     * by navigating to the checkout complete page URL.
     */
    async openCheckoutCompletePageDirectly() {
        try {
            await this.page.goto(this.url);
            logger.info("Checkout complete page opened directly successfully");
        }
        catch (error) {
            logger.error(`Checkout complete page opened directly failed: ${error}`);
            throw error;
        }
    }
}