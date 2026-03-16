import { test } from '../../fixtures/fixture';
import { authData } from '../utils/test_data/authData';

test.describe('Authentication Form Validation Tests', { tag: '@test' }, () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
    });

    test('TC_AUTH_001 - Should login successfully with valid credentials', async ({ loginPage }) => {
        await loginPage.login(authData.validUser.userName, authData.validUser.password);
        await loginPage.validateSuccessfulLogin();
    });

    test('TC_AUTH_002 - Should show error for locked out user', async ({ loginPage }) => {
        await loginPage.login(authData.lockedOutUser.userName, authData.lockedOutUser.password);
        await loginPage.validateErrorMessage(authData.lockedOutUser.errorMessage);
    });

    test('TC_AUTH_003 - Should show error for invalid username/password', async ({ loginPage }) => {
        await loginPage.login(authData.invalidCredentials.userName, authData.invalidCredentials.password);
        await loginPage.validateErrorMessage(authData.invalidCredentials.errorMessage);
    });

    test('TC_AUTH_004 - Should show error when username is empty', async ({ loginPage }) => {
        await loginPage.login(authData.emptyUserName.userName, authData.emptyUserName.password);
        await loginPage.validateErrorMessage(authData.emptyUserName.errorMessage);
    });

    test('TC_AUTH_005 - Should show error when password is empty', async ({ loginPage }) => {
        await loginPage.login(authData.emptyPassword.userName, authData.emptyPassword.password);
        await loginPage.validateErrorMessage(authData.emptyPassword.errorMessage);
    });

    test('TC_AUTH_006 - Should show error when both fields are empty', async ({ loginPage }) => {
        await loginPage.login(authData.emptyFields.userName, authData.emptyFields.password);
        await loginPage.validateErrorMessage(authData.emptyFields.errorMessage);
    });
});