import { Page, expect } from "@playwright/test";

export class CheckoutComplete {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Locators
    readonly checkoutCompletePageValidationLocator = () => this.page.locator(`//span[@data-test="title"]`);
    readonly backToHomeButtonLocator = () => this.page.locator(`//button[@id="back-to-products"]`);
    readonly thankYouMessageLocator = () => this.page.locator(`//h2[@data-test="complete-header"]`);

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
}