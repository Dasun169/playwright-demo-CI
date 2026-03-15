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
}   