import { Page, expect } from "@playwright/test";

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
    }

    /**
     * Click the back to home button in the checkout complete page
     * by clicking the back to home button.
     */
    async clickBackToHomeButton() {
        await expect(this.backToHomeButtonLocator()).toBeVisible();
        await this.backToHomeButtonLocator().click();
    }

    /**
     * Validate the checkout complete page element visibility
     * by checking if the checkout complete page validation locator, back to home button, thank you message and complete text locators are visible.
     */
    async checkoutComplatePageElementValidation() {
        await expect(this.checkoutCompletePageValidationLocator()).toBeVisible();
        await expect(this.backToHomeButtonLocator()).toBeVisible();
        await expect(this.thankYouMessageLocator()).toBeVisible();
        await expect(this.thankYouMessageLocator()).toHaveText("Thank you for your order!");
        await expect(this.completeTextMessageLocator()).toBeVisible();
        await expect(this.completeTextMessageLocator()).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
    }

    /**
     * Open the checkout complete page directly
     * by navigating to the checkout complete page URL.
     */
    async openCheckoutCompletePageDirectly() {
        await this.page.goto(this.url);
    }
}