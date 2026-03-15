import { test as base, expect } from '@playwright/test';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutStepOnePage } from '../src/pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../src/pages/CheckoutStepTwoPage';
import { CheckoutComplete } from '../src/pages/CheckoutComplete';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';


type Fixtures = {
    cartPage: CartPage;
    checkoutStepOnePage: CheckoutStepOnePage;
    checkoutStepTwoPage: CheckoutStepTwoPage;
    checkoutComplete: CheckoutComplete;
    homePage: HomePage;
    loginPage: LoginPage;
    userName: string;
    password: string;
    baseUrl: string;
};

const testPages = base.extend<Fixtures>({
    baseUrl: async ({ }, use) => {
        await use(process.env.BASE_URL || "");
    },

    checkoutStepOnePage: async ({ page }, use) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        await use(checkoutStepOnePage);
    },

    checkoutStepTwoPage: async ({ page }, use) => {
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        await use(checkoutStepTwoPage);
    },

    checkoutComplete: async ({ page }, use) => {
        const checkoutComplete = new CheckoutComplete(page);
        await use(checkoutComplete);
    },

    userName: async ({ }, use) => {
        await use(process.env.TEMPUSERNAME || "");
    },

    password: async ({ }, use) => {
        await use(process.env.PASSWORD || "");
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
});

export const test = testPages;
export { expect };