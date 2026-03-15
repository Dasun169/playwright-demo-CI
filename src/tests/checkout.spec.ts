import { test } from "../../fixtures/fixture";
import { userData } from "../utils/test_data/userData";

test(`TC_CHK_001 - Validate the full checkout process`, { tag: '@regression' }, async ({ loginPage, homePage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutComplete, userName, password }) => {
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
});

