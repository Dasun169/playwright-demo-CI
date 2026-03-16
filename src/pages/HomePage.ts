import { Page, expect } from '@playwright/test';

export class HomePage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly url = process.env.BASE_URL + "inventory.html";

    //Locators
    readonly homePageValidationLocator = () => this.page.locator(`span.title`);
    readonly cartIconLocator = () => this.page.locator(`//div[@id="shopping_cart_container"]`);
    readonly sauceLabsBackpackItemLocator = () => this.page.locator(`//a[@id="item_4_title_link"]//div`);
    readonly sauceLabsBackpackPriceLocator = () => this.page.locator(`.inventory_item_price`).nth(0);
    readonly addToCartButtonLocator = () => this.page.locator(`button#add-to-cart-sauce-labs-backpack`);
    readonly hamburgerMenuButtonLocator = () => this.page.locator(`//button[@id="react-burger-menu-btn"]`);
    readonly hamburgerMenu = () => this.page.locator(`//nav[@class="bm-item-list"]`);
    readonly hamburgerAllItemsButtonLocator = () => this.page.locator(`//a[@id="inventory_sidebar_link"]`);
    readonly hamburgerAboutButtonLocator = () => this.page.locator(`//a[@id="about_sidebar_link"]`);
    readonly hamburgerLogoutButtonLocator = () => this.page.locator(`//a[@id="logout_sidebar_link"]`);
    readonly hamburgerResetAppStateButtonLocator = () => this.page.locator(`//a[@id="reset_sidebar_link"]`);
    readonly hamburgerCloseMenuButtonLocator = () => this.page.locator(`//button[@id="react-burger-cross-btn"]`);
    readonly itemFilterButtonLocator = () => this.page.locator(`//select[@data-test="product-sort-container"]`);
    readonly itemImageLocator = () => this.page.locator(`//div[@class="inventory_item_img"]`);
    readonly itemLabelLocator = () => this.page.locator(`//div[@class="inventory_item_label"]`);
    readonly itemPriceBarLocator = () => this.page.locator(`//div[@class="pricebar"]`);
    readonly itemNameLocator = () => this.page.locator(`//div[@data-test="inventory-item-name"]`);

    //Filter options
    readonly filterOptionAZLocator = () => this.page.locator(`//option[@value="az"]`);
    readonly filterOptionZALocator = () => this.page.locator(`//option[@value="za"]`);
    readonly filterOptionLowToHighLocator = () => this.page.locator(`//option[@value="lohi"]`);
    readonly filterOptionHighToLowLocator = () => this.page.locator(`//option[@value="hilo"]`);

    //Footer Locators
    readonly footerTextLocator = () => this.page.locator(`//div[@data-test="footer-copy"]`);
    readonly footerFacebookIconLocator = () => this.page.locator(`//a[@data-test="social-facebook"]`);
    readonly footerTwitterIconLocator = () => this.page.locator(`//a[@data-test="social-twitter"]`);
    readonly footerLinkedInIconLocator = () => this.page.locator(`//a[@data-test="social-linkedin"]`);

    //Methods
    /**
     * Validate the Home Page
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async validateHomePage() {
        await expect(this.homePageValidationLocator()).toBeVisible();
        await expect(this.page).toHaveURL(process.env.BASE_URL + "inventory.html");
    }

    /**
     * Open the Home Page directly
     * by navigating to the home page.
     */
    async openHomePageDirectly() {
        await this.page.goto(this.url);
    }

    /**
     * Add the Sauce Labs Backpack to the cart
     * by clicking the add to cart button.
     */
    async addSauceLabsBackpackToCart() {
        await expect(this.sauceLabsBackpackItemLocator()).toBeVisible();
        await this.addToCartButtonLocator().click();
    }

    /**
     * Navigate to the Cart Page
     * by clicking the cart icon.
     */
    async navigateToCartPage() {
        await expect(this.cartIconLocator()).toBeVisible();
        await this.cartIconLocator().click();
    }

    /**
     * Retrieve the Sauce Labs Backpack Item Name
     * by getting the text content of the sauce labs backpack item locator.
     * @RETURN string the name of the sauce labs backpack item
     */
    async retrieveSauceLabsBackpackItemName() {
        return await this.sauceLabsBackpackItemLocator().textContent() ?? "";
    }

    /**
     * Retrieve the Sauce Labs Backpack Item Price
     * by getting the text content of the sauce labs backpack price locator.
     * @RETURN string the price of the sauce labs backpack item
     */
    async retrieveSauceLabsBackpackItemPrice() {
        return await this.sauceLabsBackpackPriceLocator().textContent() ?? "";
    }

    /**
     * Validate the Home Page Elements
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageElementValidate() {
        await expect(this.homePageValidationLocator()).toBeVisible();
        await expect(this.page).toHaveURL(process.env.BASE_URL + "inventory.html");
        await expect(this.cartIconLocator()).toBeVisible();
        await expect(this.hamburgerMenuButtonLocator()).toBeVisible();
        await expect(this.itemFilterButtonLocator()).toBeVisible();
    }

    /**
     * Validate the Hamburger Menu
     * by checking if the hamburger menu button locator is visible and the url contains the inventory page.
     */
    async hamburgerMenuValidate() {
        await expect(this.hamburgerMenuButtonLocator()).toBeVisible();
        await this.hamburgerMenuButtonLocator().click();
        await expect(this.hamburgerMenu()).toBeVisible();
    }

    /**
     * Validate the Hamburger Menu Close
     * by checking if the hamburger menu button locator is visible and the url contains the inventory page.
     */
    async hamburgerMenuCloseValidate() {
        await expect(this.hamburgerMenuButtonLocator()).toBeVisible();
        await this.hamburgerMenuButtonLocator().click();
        await expect(this.hamburgerMenu()).toBeVisible();
        await expect(this.hamburgerCloseMenuButtonLocator()).toBeVisible();
        await this.hamburgerCloseMenuButtonLocator().click();
        await expect(this.hamburgerMenu()).not.toBeVisible();
    }

    /**
     * Validate the Hamburger Menu Item Navigation
     * by checking if the hamburger menu button locator is visible and the url contains the inventory page.
     */
    async hamburgerMenuAboutNavigationValidation() {
        await expect(this.hamburgerAboutButtonLocator()).toBeVisible();
        await this.hamburgerAboutButtonLocator().click();
        await expect(this.page).toHaveURL("https://saucelabs.com/");
    }

    /**
     * Validate the Hamburger Menu Logout Navigation
     * by checking if the hamburger menu button locator is visible and the url contains the inventory page.
     */
    async hamburgerMenuLogoutNavigationValidation() {
        await expect(this.hamburgerLogoutButtonLocator()).toBeVisible();
        await this.hamburgerLogoutButtonLocator().click();
        await expect(this.page).toHaveURL(process.env.BASE_URL || "");
    }

    /**
     * Validate the Hamburger Menu Reset App State Navigation
     * by checking if the hamburger menu button locator is visible and the url contains the inventory page.
     */
    async hamburgerMenuResetAppStateNavigationValidation() {
        await expect(this.hamburgerResetAppStateButtonLocator()).toBeVisible();
        await this.hamburgerResetAppStateButtonLocator().click();
        await expect(this.page).toHaveURL(process.env.BASE_URL || "");
    }

    /**
     * Validate the Hamburger Menu All Items Navigation
     * by checking if the hamburger menu button locator is visible and the url contains the inventory page.
     */
    async hamburgerMenuAllItemsNavigationValidation() {
        await expect(this.hamburgerAllItemsButtonLocator()).toBeVisible();
        await this.hamburgerAllItemsButtonLocator().click();
        await expect(this.page).toHaveURL(process.env.BASE_URL || "");
    }

    /**
     * Validate the Home Page Item Count equal to 6
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageItemCountValidate() {
        await expect(this.itemImageLocator()).toHaveCount(6);
        await expect(this.itemLabelLocator()).toHaveCount(6);
        await expect(this.itemPriceBarLocator()).toHaveCount(6);
    }

    /**
     * Validate the Home Page Item Filter
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageItemFilterValidate() {
        await expect(this.itemFilterButtonLocator()).toBeVisible();
        await this.itemFilterButtonLocator().click();
        await this.page.waitForTimeout(1000);
        await expect(this.filterOptionAZLocator()).toBeVisible();
        await expect(this.filterOptionZALocator()).toBeVisible();
        await expect(this.filterOptionLowToHighLocator()).toBeVisible();
        await expect(this.filterOptionHighToLowLocator()).toBeVisible();
    }

    /**
     * Validate the Home Page Item Filter Low to High
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageItemFilterLowToHighValidate() {
        await expect(this.itemFilterButtonLocator()).toBeVisible();
        await this.itemFilterButtonLocator().click();
        await this.page.waitForTimeout(1000);
        await expect(this.filterOptionLowToHighLocator()).toBeVisible();
        await this.filterOptionLowToHighLocator().click();
        await expect(this.itemNameLocator().nth(0)).toHaveText("Sauce Labs Onesie");
    }

    /**
     * Validate the Home Page Item Filter High to Low
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageItemFilterHighToLowValidate() {
        await expect(this.itemFilterButtonLocator()).toBeVisible();
        await this.itemFilterButtonLocator().click();
        await this.page.waitForTimeout(1000);
        await expect(this.filterOptionHighToLowLocator()).toBeVisible();
        await this.filterOptionHighToLowLocator().click();
        await expect(this.itemNameLocator().nth(0)).toHaveText("Sauce Labs Fleece Jacket");
    }

    /**
     * Validate the Home Page Item Filter A to Z
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageItemFilterAZValidate() {
        await expect(this.itemFilterButtonLocator()).toBeVisible();
        await this.itemFilterButtonLocator().click();
        await this.page.waitForTimeout(1000);
        await expect(this.filterOptionAZLocator()).toBeVisible();
        await this.filterOptionAZLocator().click();
        await expect(this.itemNameLocator().nth(0)).toHaveText("Sauce Labs Backpack");
    }

    /**
     * Validate the Home Page Item Filter Z to A
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageItemFilterZALocate() {
        await expect(this.itemFilterButtonLocator()).toBeVisible();
        await this.itemFilterButtonLocator().click();
        await this.page.waitForTimeout(1000);
        await expect(this.filterOptionZALocator()).toBeVisible();
        await this.filterOptionZALocator().click();
        await expect(this.itemNameLocator().nth(0)).toHaveText("Test.allTheThings() T-Shirt (Red)");
    }

    /**
     * Validate the Home Page Footer Text
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageFooterTextValidate() {
        await expect(this.footerTextLocator()).toBeVisible();
    }

    /**
     * Validate the Home Page Footer Social Media Links
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageFooterSocialMediaLinksValidate() {
        await expect(this.footerFacebookIconLocator()).toBeVisible();
        await expect(this.footerTwitterIconLocator()).toBeVisible();
        await expect(this.footerLinkedInIconLocator()).toBeVisible();
    }

    /**
     * Validate the Home Page Footer Facebook Navigation
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageFooterFacebookNavigationValidation() {
        await expect(this.footerFacebookIconLocator()).toBeVisible();
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.footerFacebookIconLocator().click()
        ]);

        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL("https://www.facebook.com/saucelabs");
    }

    /**
     * Validate the Home Page Footer Twitter Navigation
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageFooterTwitterNavigationValidation() {
        await expect(this.footerTwitterIconLocator()).toBeVisible();
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.footerTwitterIconLocator().click()
        ]);

        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL("https://x.com/saucelabs");
    }

    /**
     * Validate the Home Page Footer LinkedIn Navigation
     * by checking if the home page validation locator is visible and the url contains the inventory page.
     */
    async homePageFooterLinkedInNavigationValidation() {
        await expect(this.footerLinkedInIconLocator()).toBeVisible();
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.footerLinkedInIconLocator().click()
        ]);

        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL("https://www.linkedin.com/company/sauce-labs/");
    }
}