import { Page, expect } from "@playwright/test";

export class CheckoutStepOnePage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Locators
    readonly checkoutStepOnePageValidationLocator = () => this.page.locator(`//span[@data-test="title"]`);
    readonly firstNameLocator = () => this.page.locator(`//input[@id="first-name"]`);
    readonly lastNameLocator = () => this.page.locator(`//input[@id="last-name"]`);
    readonly postalCodeLocator = () => this.page.locator(`//input[@id="postal-code"]`);
    readonly continueButtonLocator = () => this.page.locator(`//input[@id="continue"]`);

    //Methods
    /**
     * Validate the Checkout Step One Page
     * by checking if the checkout step one page validation locator is visible and the url contains the checkout step one page.
     */
    async validateCheckoutStepOnePage() {
        await expect(this.checkoutStepOnePageValidationLocator()).toBeVisible();
        await expect(this.page).toHaveURL(process.env.BASE_URL + "checkout-step-one.html");
    }

    /**
     * Fill the user details in the checkout step one page
     * by entering the first name, last name and postal code.
     * @PARAM firstName the first name of the user
     * @PARAM lastName the last name of the user
     * @PARAM postalCode the postal code of the user
     */
    async fillUserDetails(firstName: string, lastName: string, postalCode: string) {
        await expect(this.firstNameLocator()).toBeVisible();
        await this.firstNameLocator().fill(firstName);
        await expect(this.lastNameLocator()).toBeVisible();
        await this.lastNameLocator().fill(lastName);
        await expect(this.postalCodeLocator()).toBeVisible();
        await this.postalCodeLocator().fill(postalCode);
    }

    /**
     * Click the continue button in the checkout step one page
     * by clicking the continue button.
     */
    async clickContinueButton() {
        await expect(this.continueButtonLocator()).toBeVisible();
        await this.continueButtonLocator().click();
    }
}