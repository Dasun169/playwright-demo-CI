import { Page, expect } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Locators
    readonly userNameInputLocator = () => this.page.locator(`[data-test="username"]`);
    readonly passwordInputLocator = () => this.page.locator(`[data-test="password"]`);
    readonly loginButtonLocator = () => this.page.locator(`[data-test="login-button"]`);
    readonly errorMessageLocator = () => this.page.locator(`//h3[@data-test="error"]`);

    //Methods
    /**
     * Navigate to the Home Page from Login Page
     * by entering the provided username and password.
     * @PARAM username the username used for login
     * @PARAM password the password used for login
     */
    async loginToHomePage(username: string, password: string) {
        await expect(this.userNameInputLocator()).toBeVisible();
        await this.userNameInputLocator().fill(username);
        await this.passwordInputLocator().fill(password);
        await expect(this.loginButtonLocator()).toBeVisible();
        await this.loginButtonLocator().click();
    }

    /**
     * Navigate to the Login Page
     */
    async navigateToLoginPage() {
        // Use Playwright's configured baseURL; '/' will resolve against it
        await this.page.goto(process.env.BASE_URL || "");
    }

    /**
     * Validate the error message for the home page
     * by checking if the error message is visible and the url contains the home page.
     */
    async validateErrorMessageForHomePage() {
        await this.page.waitForTimeout(2000);
        await expect(this.page).toHaveURL(process.env.BASE_URL + "");
        await expect(this.errorMessageLocator()).toBeVisible();
        await expect(this.errorMessageLocator()).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
    }

    /**
     * Validate the error message for the cart page
     * by checking if the error message is visible and the url contains the cart page.
     */
    async validateErrorMessageForCartPage() {
        await this.page.waitForTimeout(2000);
        await expect(this.page).toHaveURL(process.env.BASE_URL + "");
        await expect(this.errorMessageLocator()).toBeVisible();
        await expect(this.errorMessageLocator()).toHaveText("Epic sadface: You can only access '/cart.html' when you are logged in.");
    }

    /**
     * Validate the error message for the checkout step one page
     * by checking if the error message is visible and the url contains the checkout step one page.
     */
    async validateErrorMessageForCheckoutStepOnePage() {
        await this.page.waitForTimeout(2000);
        await expect(this.page).toHaveURL(process.env.BASE_URL + "");
        await expect(this.errorMessageLocator()).toBeVisible();
        await expect(this.errorMessageLocator()).toHaveText("Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.");
    }

    /**
     * Validate the error message for the checkout step two page
     * by checking if the error message is visible and the url contains the checkout step two page.
     */
    async validateErrorMessageForCheckoutStepTwoPage() {
        await this.page.waitForTimeout(2000);
        await expect(this.page).toHaveURL(process.env.BASE_URL + "");
        await expect(this.errorMessageLocator()).toBeVisible();
        await expect(this.errorMessageLocator()).toHaveText("Epic sadface: You can only access '/checkout-step-two.html' when you are logged in.");
    }

    /**
     * Validate the error message for the checkout complete page
     * by checking if the error message is visible and the url contains the checkout complete page.
     */
    async validateErrorMessageForCheckoutCompletePage() {
        await this.page.waitForTimeout(2000);
        await expect(this.page).toHaveURL(process.env.BASE_URL + "");
        await expect(this.errorMessageLocator()).toBeVisible();
        await expect(this.errorMessageLocator()).toHaveText("Epic sadface: You can only access '/checkout-complete.html' when you are logged in.");
    }

    /**
     * Validate the Login Page
     * by checking if the login page validation locator is visible and the url contains the login page.
     */
    async validateLoginPage() {
        await expect(this.page).toHaveURL(process.env.BASE_URL + "");
        await expect(this.userNameInputLocator()).toBeVisible();
        await expect(this.passwordInputLocator()).toBeVisible();
        await expect(this.loginButtonLocator()).toBeVisible();
    }

    /**
     * Login to the home page with the provided username and password.
     * @param username the username used for login
     * @param password the password used for login
     */
    async login(username: string, password: string) {
        if (username) await this.userNameInputLocator().fill(username);
        if (password) await this.passwordInputLocator().fill(password);
        await this.loginButtonLocator().click();
    }

    /**
     * Validate the error message for the login page
     * by checking if the error message is visible and the url contains the login page.
     * @param expectedMessage the error message to validate
     */
    async validateErrorMessage(expectedMessage: string) {
        await expect(this.errorMessageLocator()).toBeVisible();
        await expect(this.errorMessageLocator()).toHaveText(expectedMessage);
    }

    /**
     * Validate the successful login
     * by checking if the url contains the inventory page.
     */
    async validateSuccessfulLogin() {
        await expect(this.page).toHaveURL(/.*inventory.html/);
    }
}   