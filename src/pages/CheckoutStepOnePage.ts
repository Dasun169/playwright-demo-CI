import { Page, expect } from "@playwright/test";
import { logger } from "../utils/logger";

export class CheckoutStepOnePage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly url = process.env.BASE_URL + "checkout-step-one.html";

    //Locators
    readonly checkoutStepOnePageValidationLocator = () => this.page.locator(`//span[@data-test="title"]`);
    readonly firstNameLocator = () => this.page.locator(`//input[@id="first-name"]`);
    readonly lastNameLocator = () => this.page.locator(`//input[@id="last-name"]`);
    readonly postalCodeLocator = () => this.page.locator(`//input[@id="postal-code"]`);
    readonly continueButtonLocator = () => this.page.locator(`//input[@id="continue"]`);
    readonly cancelButtonLocator = () => this.page.locator(`//button[@data-test="cancel"]`);
    readonly errorMessageLocator = () => this.page.locator(`//h3[@data-test="error"]`);

    //Methods
    /**
     * Validate the Checkout Step One Page
     * by checking if the checkout step one page validation locator is visible and the url contains the checkout step one page.
     */
    async validateCheckoutStepOnePage() {
        try {
            await expect(this.checkoutStepOnePageValidationLocator()).toBeVisible();
            await expect(this.page).toHaveURL(process.env.BASE_URL + "checkout-step-one.html");
            logger.info("Checkout step one page validated successfully");
        }
        catch (error) {
            logger.error(`Checkout step one page validation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Fill the user details in the checkout step one page
     * by entering the first name, last name and postal code.
     * @PARAM firstName the first name of the user
     * @PARAM lastName the last name of the user
     * @PARAM postalCode the postal code of the user
     */
    async fillUserDetails(firstName: string, lastName: string, postalCode: string) {
        try {
            await expect(this.firstNameLocator()).toBeVisible();
            await this.firstNameLocator().fill(firstName);
            await expect(this.lastNameLocator()).toBeVisible();
            await this.lastNameLocator().fill(lastName);
            await expect(this.postalCodeLocator()).toBeVisible();
            await this.postalCodeLocator().fill(postalCode);
            logger.info("User details filled successfully");
        }
        catch (error) {
            logger.error(`User details filling failed: ${error}`);
            throw error;
        }
    }

    /**
     * Click the continue button in the checkout step one page
     * by clicking the continue button.
     */
    async clickContinueButton() {
        try {
            await expect(this.continueButtonLocator()).toBeVisible();
            await this.continueButtonLocator().click();
            logger.info("Continue button clicked successfully");
        }
        catch (error) {
            logger.error(`Continue button click failed: ${error}`);
            throw error;
        }
    }

    /**
     * Click the cancel button in the checkout step one page
     * by clicking the cancel button.
     */
    async clickCancelButton() {
        try {
            await expect(this.cancelButtonLocator()).toBeVisible();
            await this.cancelButtonLocator().click();
            logger.info("Cancel button clicked successfully");
        }
        catch (error) {
            logger.error(`Cancel button click failed: ${error}`);
            throw error;
        }
    }

    /**
     * Open the checkout step one page directly
     * by navigating to the checkout step one page URL.
     */
    async openCheckoutStepOnePageDirectly() {
        try {
            await this.page.goto(this.url);
            logger.info("Checkout step one page opened successfully");
        }
        catch (error) {
            logger.error(`Checkout step one page opened failed: ${error}`);
            throw error;
        }
    }

    /**
     * Validate the error message for empty first name in the checkout step one page
     * by checking if the error message is visible and the url contains the checkout step one page.
     * @param firstName the first name of the user
     * @param lastName the last name of the user
     * @param postalCode the postal code of the user
     * @param expectedError the expected error message
     */
    async validateCheckoutErrorMessage(firstName: string, lastName: string, postalCode: string, expectedError: string) {
        try {
            await expect(this.firstNameLocator()).toBeVisible();
            await this.firstNameLocator().fill(firstName);

            await expect(this.lastNameLocator()).toBeVisible();
            await this.lastNameLocator().fill(lastName);

            await expect(this.postalCodeLocator()).toBeVisible();
            await this.postalCodeLocator().fill(postalCode);

            await expect(this.continueButtonLocator()).toBeVisible();
            await this.continueButtonLocator().click();

            await expect(this.errorMessageLocator()).toBeVisible();
            await expect(this.errorMessageLocator()).toHaveText(expectedError);
            logger.info("Checkout error message validated successfully");
        }
        catch (error) {
            logger.error(`Checkout error message validation failed: ${error}`);
            throw error;
        }
    }
}