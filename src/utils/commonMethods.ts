import { Page } from "@playwright/test";

export class CommonMethods {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Loads the home page using the configured baseURL.
     */
    async loadLoginPage() {
        await this.page.goto("https://www.saucedemo.com/");
    }
}
