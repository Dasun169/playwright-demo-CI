import { test } from "../../fixtures/fixture";
import { userData } from "../utils/test_data/userData";
import { checkoutErrorData } from "../utils/test_data/checkoutData";
import { logger } from "../utils/logger";
import { logTestStatus } from "../utils/testStatusTracker";

test(`TC_CHK_001 - Validate the full checkout process`, { tag: ['@regression', '@smoke'] }, async ({ loginPage, homePage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutComplete, userName, password }) => {
    logger.info("----------------------------------------------------------");
    logger.info("Starting Test: TC_CHK_001 - Validate the full checkout process");
    try {
        let itemName: string;
        let itemPrice: string;
        let itemQuantity: number = 0;

        await test.step(`Navigate to the home page with valid credentials`, async () => {
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

        logTestStatus("TC_CHK_001", "passed");
    } catch (error) {
        logger.error(`Error in TC_CHK_001: ${error}`);
        logTestStatus("TC_CHK_001", "failed");
        throw error;
    }
});

test.describe(`HomePage Element visibility validation`, { tag: ['@regression', '@smoke'] }, async () => {
    test.beforeEach(async ({ loginPage, homePage, userName, password }) => {
        logger.info("----------------------------------------------------------");
        await loginPage.navigateToLoginPage();
        await loginPage.loginToHomePage(userName, password);
        await homePage.validateHomePage();
    });

    test(`TC_CHK_002 - Validate the home page element visibility`, async ({ homePage }) => {
        try {
            await homePage.homePageElementValidate();
            await homePage.homePageItemCountValidate();
            await homePage.hamburgerMenuCloseValidate();
            logTestStatus("TC_CHK_002", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_002: ${error}`);
            logTestStatus("TC_CHK_002", "failed");
            throw error;
        }
    });

    test(`TC_CHK_003 - Validate the home page hamburger menu about navigation`, { tag: ['@regression', '@smoke'] }, async ({ homePage }) => {
        try {
            await homePage.hamburgerMenuValidate();
            await homePage.hamburgerMenuAboutNavigationValidation();
            logTestStatus("TC_CHK_003", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_003: ${error}`);
            logTestStatus("TC_CHK_003", "failed");
            throw error;
        }
    });

    test(`TC_CHK_004 - Validate the home page hamburger menu logout navigation`, { tag: ['@regression', '@smoke'] }, async ({ homePage }) => {
        try {
            await homePage.hamburgerMenuValidate();
            await homePage.hamburgerMenuLogoutNavigationValidation();
            logTestStatus("TC_CHK_004", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_004: ${error}`);
            logTestStatus("TC_CHK_004", "failed");
            throw error;
        }
    });
});

test.describe(`Cart Page Element and Functionality Validation`, { tag: ['@regression', '@smoke'] }, async () => {
    test.beforeEach(async ({ loginPage, homePage, userName, password }) => {
        logger.info("----------------------------------------------------------");
        await loginPage.navigateToLoginPage();
        await loginPage.loginToHomePage(userName, password);
        await homePage.validateHomePage();
        //Add a item to cart
        await homePage.addSauceLabsBackpackToCart();
        await homePage.navigateToCartPage();
    });

    test(`TC_CHK_005 - Continue Shopping button functionality validation`, { tag: ['@regression', '@smoke'] }, async ({ cartPage }) => {
        try {
            await cartPage.continueShoppingButtonValidation();
            logTestStatus("TC_CHK_005", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_005: ${error}`);
            logTestStatus("TC_CHK_005", "failed");
            throw error;
        }
    });

    test(`TC_CHK_006 - Remove item from cart functionality validation`, async ({ cartPage }) => {
        try {
            await cartPage.removeItemFromCart();
            logTestStatus("TC_CHK_006", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_006: ${error}`);
            logTestStatus("TC_CHK_006", "failed");
            throw error;
        }
    });
});

test(`TC_CHK_007 - Validate the checkout step one page cancel button functionality`, { tag: '@regression' }, async ({ loginPage, homePage, cartPage, checkoutStepOnePage, userName, password }) => {
    logger.info("Starting Test: TC_CHK_007 - Validate the checkout step one page cancel button functionality");
    try {
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
        logTestStatus("TC_CHK_007", "passed");
    } catch (error) {
        logger.error(`Error in TC_CHK_007: ${error}`);
        logTestStatus("TC_CHK_007", "failed");
        throw error;
    }
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
        try {
            await checkoutStepTwoPage.validateCheckoutStepTwoPageElements();
            logTestStatus("TC_CHK_008", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_008: ${error}`);
            logTestStatus("TC_CHK_008", "failed");
            throw error;
        }
    });

    test(`TC_CHK_009 - Validate the checkout step two page cancel button functionality`, async ({ checkoutStepTwoPage, homePage }) => {
        try {
            await checkoutStepTwoPage.clickCancelButton();
            await homePage.validateHomePage();
            logTestStatus("TC_CHK_009", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_009: ${error}`);
            logTestStatus("TC_CHK_009", "failed");
            throw error;
        }
    });
});

test(`TC_CHK_010 - Validate the checkout complete page element visibility`, { tag: '@regression' }, async ({ loginPage, homePage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutComplete, userName, password }) => {
    try {
        logger.info("----------------------------------------------------------");
        logger.info("Starting Test: TC_CHK_010 - Validate the checkout complete page element visibility");
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
        logTestStatus("TC_CHK_010", "passed");
    } catch (error) {
        logger.error(`Error in TC_CHK_010: ${error}`);
        logTestStatus("TC_CHK_010", "failed");
        throw error;
    }
});

test.describe(`HomePage Footer Validation`, { tag: '@regression' }, async () => {
    test.beforeEach(async ({ loginPage, homePage, userName, password }) => {
        logger.info("----------------------------------------------------------");
        await loginPage.navigateToLoginPage();
        await loginPage.loginToHomePage(userName, password);
        await homePage.validateHomePage();
    });

    test(`TC_CHK_011 - Validate the home page footer text and social media links`, async ({ homePage }) => {
        try {
            await homePage.homePageFooterTextValidate();
            await homePage.homePageFooterSocialMediaLinksValidate();
            logTestStatus("TC_CHK_011", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_011: ${error}`);
            logTestStatus("TC_CHK_011", "failed");
            throw error;
        }
    });

    test(`TC_CHK_012 - Validate the home page footer facebook navigation`, async ({ homePage }) => {
        try {
            await homePage.homePageFooterFacebookNavigationValidation();
            logTestStatus("TC_CHK_012", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_012: ${error}`);
            logTestStatus("TC_CHK_012", "failed");
            throw error;
        }
    });

    test(`TC_CHK_013 - Validate the home page footer twitter navigation`, async ({ homePage }) => {
        try {
            await homePage.homePageFooterTwitterNavigationValidation();
            logTestStatus("TC_CHK_013", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_013: ${error}`);
            logTestStatus("TC_CHK_013", "failed");
            throw error;
        }
    });

    test(`TC_CHK_014 - Validate the home page footer linkedin navigation`, async ({ homePage }) => {
        try {
            await homePage.homePageFooterLinkedInNavigationValidation();
            logTestStatus("TC_CHK_014", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_014: ${error}`);
            logTestStatus("TC_CHK_014", "failed");
            throw error;
        }
    });
});

test.describe(`Error Message Validation for direct access to other pages`, { tag: '@regression' }, async () => {
    test(`TC_CHK_015 - Validate the error message for direct access to home page`, async ({ homePage, loginPage }) => {
        try {
            logger.info("----------------------------------------------------------");
            logger.info("Starting Test: TC_CHK_015 - Validate the error message for direct access to home page");
            await homePage.openHomePageDirectly();
            await loginPage.validateErrorMessageForHomePage();
            logTestStatus("TC_CHK_015", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_015: ${error}`);
            logTestStatus("TC_CHK_015", "failed");
            throw error;
        }
    });

    test(`TC_CHK_016 - Validate the error message for direct access to cart page`, async ({ cartPage, loginPage }) => {
        try {
            logger.info("----------------------------------------------------------");
            logger.info("Starting Test: TC_CHK_016 - Validate the error message for direct access to cart page");
            await cartPage.openCartPageDirectly();
            await loginPage.validateErrorMessageForCartPage();
            logTestStatus("TC_CHK_016", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_016: ${error}`);
            logTestStatus("TC_CHK_016", "failed");
            throw error;
        }
    });

    test(`TC_CHK_017 - Validate the error message for direct access to checkout step one page`, async ({ checkoutStepOnePage, loginPage }) => {
        try {
            logger.info("----------------------------------------------------------");
            logger.info("Starting Test: TC_CHK_017 - Validate the error message for direct access to checkout step one page");
            await checkoutStepOnePage.openCheckoutStepOnePageDirectly();
            await loginPage.validateErrorMessageForCheckoutStepOnePage();
            logTestStatus("TC_CHK_017", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_017: ${error}`);
            logTestStatus("TC_CHK_017", "failed");
            throw error;
        }
    });

    test(`TC_CHK_018 - Validate the error message for direct access to checkout step two page`, async ({ checkoutStepTwoPage, loginPage }) => {
        try {
            logger.info("----------------------------------------------------------");
            logger.info("Starting Test: TC_CHK_018 - Validate the error message for direct access to checkout step two page");
            await checkoutStepTwoPage.openCheckoutStepTwoPageDirectly();
            await loginPage.validateErrorMessageForCheckoutStepTwoPage();
            logTestStatus("TC_CHK_018", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_018: ${error}`);
            logTestStatus("TC_CHK_018", "failed");
            throw error;
        }
    });

    test(`TC_CHK_019 - Validate the error message for direct access to checkout complete page`, async ({ checkoutComplete, loginPage }) => {
        try {
            logger.info("----------------------------------------------------------");
            logger.info("Starting Test: TC_CHK_019 - Validate the error message for direct access to checkout complete page");
            await checkoutComplete.openCheckoutCompletePageDirectly();
            await loginPage.validateErrorMessageForCheckoutCompletePage();
            logTestStatus("TC_CHK_019", "passed");
        } catch (error) {
            logger.error(`Error in TC_CHK_019: ${error}`);
            logTestStatus("TC_CHK_019", "failed");
            throw error;
        }
    });
});

test(`TC_CHK_020 - Logout from home page`, { tag: ['@regression', '@smoke'] }, async ({ loginPage, homePage, userName, password }) => {
    try {
        logger.info("----------------------------------------------------------");
        logger.info("Starting Test: TC_CHK_020 - Logout from home page");
        await loginPage.navigateToLoginPage();
        await loginPage.loginToHomePage(userName, password);
        await homePage.validateHomePage();
        await homePage.hamburgerMenuValidate();
        await homePage.hamburgerMenuLogoutNavigationValidation();
        await loginPage.validateLoginPage();
        logTestStatus("TC_CHK_020", "passed");
    } catch (error) {
        logger.error(`Error in TC_CHK_020: ${error}`);
        logTestStatus("TC_CHK_020", "failed");
        throw error;
    }
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
        checkoutErrorData.emptyFirstName,
        checkoutErrorData.emptyLastName,
        checkoutErrorData.emptyPostalCode
    ];

    for (const data of testCases) {
        test(`${data.testId} - ${data.description}`, async ({ checkoutStepOnePage }) => {
            logger.info(`Starting Test: ${data.testId} - ${data.description}`);
            try {
                await checkoutStepOnePage.validateCheckoutErrorMessage(
                    data.firstName,
                    data.lastName,
                    data.postalCode,
                    data.errorMessage
                );
                logTestStatus(data.testId, "passed");
            } catch (error) {
                logger.error(`Error in ${data.testId}: ${error}`);
                logTestStatus(data.testId, "failed");
                throw error;
            }
        });
    }
});