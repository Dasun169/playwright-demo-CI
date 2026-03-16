import { test } from "../../fixtures/fixture";
import { userData } from "../utils/test_data/userData";
import { checkoutErrorData } from "../utils/test_data/checkoutData";
import { logger } from "../utils/logger";

test(`TC_CHK_001 - Validate the full checkout process`, { tag: '@regression' }, async ({ loginPage, homePage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutComplete, userName, password }) => {
    let itemName: string;
    let itemPrice: string;
    let itemQuantity: number = 0;

    await test.step(`Navigate to the home page with valid credentials`, async () => {
        logger.info("----------------------------------------------------------");
        await loginPage.navigateToLoginPage();
        await loginPage.loginToHomePage(userName, password);
        await homePage.validateHomePage();
    });

    await test.step(`Add a item to cart and verify it`, async () => {

        itemName = await homePage.retrieveSauceLabsBackpackItemName();
        itemPrice = await homePage.retrieveSauceLabsBackpackItemPrice();

        await homePage.addSauceLabsBackpackToCart();
        await homePage.navigateToCartPage();
        await cartPage.validateCartPage();
        await cartPage.validateItemDetails(itemName, itemPrice);
        await cartPage.clickOnCheckoutButton();
        itemQuantity++;
    });

    await test.step(`Fill the user details and continue to the checkout step one page`, async () => {
        await checkoutStepOnePage.validateCheckoutStepOnePage();
        await checkoutStepOnePage.fillUserDetails(userData.validUserForCheckout.firstName, userData.validUserForCheckout.lastName, userData.validUserForCheckout.postalCode);
        await checkoutStepOnePage.clickContinueButton();
    });

    await test.step(`Validate the checkout step two page`, async () => {
        await checkoutStepTwoPage.validateCheckoutStepTwoPage();
        await checkoutStepTwoPage.validateItemDetails(itemName, itemPrice, itemQuantity.toString());
        await checkoutStepTwoPage.clickFinishButton();
    });

    await test.step(`Validate the checkout complete page and navigate to the home page`, async () => {
        await checkoutComplete.validateCheckoutCompletePage();
        await checkoutComplete.clickBackToHomeButton();
    });
});

test.describe(`HomePage Element visibility validation`, { tag: '@regression' }, async () => {
    test.beforeEach(async ({ loginPage, homePage, userName, password }) => {
        logger.info("----------------------------------------------------------");
        await loginPage.navigateToLoginPage();
        await loginPage.loginToHomePage(userName, password);
        await homePage.validateHomePage();
    });

    test(`TC_CHK_002 - Validate the home page element visibility`, async ({ homePage }) => {
        await homePage.homePageElementValidate();
        await homePage.homePageItemCountValidate();
        await homePage.hamburgerMenuCloseValidate();
    });

    test(`TC_CHK_003 - Validate the home page hamburger menu about navigation`, async ({ homePage }) => {
        await homePage.hamburgerMenuValidate();
        await homePage.hamburgerMenuAboutNavigationValidation();
    });

    test(`TC_CHK_004 - Validate the home page hamburger menu logout navigation`, async ({ homePage }) => {
        await homePage.hamburgerMenuValidate();
        await homePage.hamburgerMenuLogoutNavigationValidation();
    });
});

test.describe(`Cart Page Element and Functionality Validation`, { tag: '@regression' }, async () => {
    test.beforeEach(async ({ loginPage, homePage, userName, password }) => {
        logger.info("----------------------------------------------------------");
        await loginPage.navigateToLoginPage();
        await loginPage.loginToHomePage(userName, password);
        await homePage.validateHomePage();
        //Add a item to cart
        await homePage.addSauceLabsBackpackToCart();
        await homePage.navigateToCartPage();
    });

    test(`TC_CHK_005 - Continue Shopping button functionality validation`, async ({ cartPage }) => {
        await cartPage.continueShoppingButtonValidation();
    });

    test(`TC_CHK_006 - Remove item from cart functionality validation`, async ({ cartPage }) => {
        await cartPage.removeItemFromCart();
    });
});

test(`TC_CHK_007 - Validate the checkout step one page cancel button functionality`, { tag: '@regression' }, async ({ loginPage, homePage, cartPage, checkoutStepOnePage, userName, password }) => {
    logger.info("----------------------------------------------------------");
    await loginPage.navigateToLoginPage();
    await loginPage.loginToHomePage(userName, password);
    await homePage.validateHomePage();
    await homePage.addSauceLabsBackpackToCart();
    await homePage.navigateToCartPage();
    await cartPage.clickOnCheckoutButton();
    await checkoutStepOnePage.validateCheckoutStepOnePage();
    await checkoutStepOnePage.clickCancelButton();
    await cartPage.validateCartPage();
});

test.describe(`Checkout Step Two Page Element and Functionality Validation`, { tag: '@regression' }, async () => {
    test.beforeEach(async ({ loginPage, homePage, cartPage, checkoutStepOnePage, userName, password }) => {
        logger.info("----------------------------------------------------------");
        await loginPage.navigateToLoginPage();
        await loginPage.loginToHomePage(userName, password);
        await homePage.validateHomePage();
        await homePage.addSauceLabsBackpackToCart();
        await homePage.navigateToCartPage();
        await cartPage.clickOnCheckoutButton();
        await checkoutStepOnePage.validateCheckoutStepOnePage();
        await checkoutStepOnePage.fillUserDetails(userData.validUserForCheckout.firstName, userData.validUserForCheckout.lastName, userData.validUserForCheckout.postalCode);
        await checkoutStepOnePage.clickContinueButton();
    });

    test(`TC_CHK_008 - Validate the checkout step two page element visibility`, async ({ checkoutStepTwoPage }) => {
        await checkoutStepTwoPage.validateCheckoutStepTwoPageElements();
    });

    test(`TC_CHK_009 - Validate the checkout step two page cancel button functionality`, async ({ checkoutStepTwoPage, homePage }) => {
        await checkoutStepTwoPage.clickCancelButton();
        await homePage.validateHomePage();
    });
});

test(`TC_CHK_010 - Validate the checkout complete page element visibility`, { tag: '@regression' }, async ({ loginPage, homePage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutComplete, userName, password }) => {
    logger.info("----------------------------------------------------------");
    await loginPage.navigateToLoginPage();
    await loginPage.loginToHomePage(userName, password);
    await homePage.validateHomePage();
    await homePage.addSauceLabsBackpackToCart();
    await homePage.navigateToCartPage();
    await cartPage.clickOnCheckoutButton();
    await checkoutStepOnePage.validateCheckoutStepOnePage();
    await checkoutStepOnePage.fillUserDetails(userData.validUserForCheckout.firstName, userData.validUserForCheckout.lastName, userData.validUserForCheckout.postalCode);
    await checkoutStepOnePage.clickContinueButton();
    await checkoutStepTwoPage.validateCheckoutStepTwoPage();
    await checkoutStepTwoPage.clickFinishButton();
    await checkoutComplete.validateCheckoutCompletePage();
    await checkoutComplete.checkoutComplatePageElementValidation();
});

test.describe(`HomePage Footer Validation`, { tag: '@regression' }, async () => {
    test.beforeEach(async ({ loginPage, homePage, userName, password }) => {
        logger.info("----------------------------------------------------------");
        await loginPage.navigateToLoginPage();
        await loginPage.loginToHomePage(userName, password);
        await homePage.validateHomePage();
    });

    test(`TC_CHK_011 - Validate the home page footer text and social media links`, async ({ homePage }) => {
        await homePage.homePageFooterTextValidate();
        await homePage.homePageFooterSocialMediaLinksValidate();
    });

    test(`TC_CHK_012 - Validate the home page footer facebook navigation`, async ({ homePage }) => {
        await homePage.homePageFooterFacebookNavigationValidation();
    });

    test(`TC_CHK_013 - Validate the home page footer twitter navigation`, async ({ homePage }) => {
        await homePage.homePageFooterTwitterNavigationValidation();
    });

    test(`TC_CHK_014 - Validate the home page footer linkedin navigation`, async ({ homePage }) => {
        await homePage.homePageFooterLinkedInNavigationValidation();
    });
});

test.describe(`Error Message Validation for direct access to other pages`, { tag: '@regression' }, async () => {
    test(`TC_CHK_015 - Validate the error message for direct access to home page`, async ({ homePage, loginPage }) => {
        logger.info("----------------------------------------------------------");
        await homePage.openHomePageDirectly();
        await loginPage.validateErrorMessageForHomePage();
    });

    test(`TC_CHK_016 - Validate the error message for direct access to cart page`, async ({ cartPage, loginPage }) => {
        logger.info("----------------------------------------------------------");
        await cartPage.openCartPageDirectly();
        await loginPage.validateErrorMessageForCartPage();
    });

    test(`TC_CHK_017 - Validate the error message for direct access to checkout step one page`, async ({ checkoutStepOnePage, loginPage }) => {
        logger.info("----------------------------------------------------------");
        await checkoutStepOnePage.openCheckoutStepOnePageDirectly();
        await loginPage.validateErrorMessageForCheckoutStepOnePage();
    });

    test(`TC_CHK_018 - Validate the error message for direct access to checkout step two page`, async ({ checkoutStepTwoPage, loginPage }) => {
        logger.info("----------------------------------------------------------");
        await checkoutStepTwoPage.openCheckoutStepTwoPageDirectly();
        await loginPage.validateErrorMessageForCheckoutStepTwoPage();
    });

    test(`TC_CHK_019 - Validate the error message for direct access to checkout complete page`, async ({ checkoutComplete, loginPage }) => {
        logger.info("----------------------------------------------------------");
        await checkoutComplete.openCheckoutCompletePageDirectly();
        await loginPage.validateErrorMessageForCheckoutCompletePage();
    });
});

test(`TC_CHK_020 - Logout from home page`, { tag: '@regression' }, async ({ loginPage, homePage, userName, password }) => {
    logger.info("----------------------------------------------------------");
    await loginPage.navigateToLoginPage();
    await loginPage.loginToHomePage(userName, password);
    await homePage.validateHomePage();
    await homePage.hamburgerMenuValidate();
    await homePage.hamburgerMenuLogoutNavigationValidation();
    await loginPage.validateLoginPage();
});

test.describe(`Checkout One Page Form Error messages validation with empty fields`, { tag: '@regression' }, async () => {
    test.beforeEach(async ({ loginPage, homePage, cartPage, checkoutStepOnePage, userName, password }) => {
        logger.info("----------------------------------------------------------");
        await loginPage.navigateToLoginPage();
        await loginPage.loginToHomePage(userName, password);
        await homePage.validateHomePage();
        await homePage.addSauceLabsBackpackToCart();
        await homePage.navigateToCartPage();
        await cartPage.clickOnCheckoutButton();
        await checkoutStepOnePage.validateCheckoutStepOnePage();
    });

    const testCases = [
        { name: "TC_CHK_021 - Validate empty first name error", data: checkoutErrorData.emptyFirstName },
        { name: "TC_CHK_022 - Validate empty last name error", data: checkoutErrorData.emptyLastName },
        { name: "TC_CHK_023 - Validate empty postal code error", data: checkoutErrorData.emptyPostalCode }
    ];

    for (const tc of testCases) {
        test(`${tc.name}`, async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.validateCheckoutErrorMessage(
                tc.data.firstName,
                tc.data.lastName,
                tc.data.postalCode,
                tc.data.errorMessage
            );
        });
    }
});