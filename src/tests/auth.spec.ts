import { test } from '../../fixtures/fixture';
import { authData } from '../utils/test_data/authData';
import { logger } from '../utils/logger';

test.describe('Authentication Form Validation Tests', { tag: '@regression' }, () => {

    test.beforeEach(async ({ loginPage }) => {
        logger.info("----------------------------------------------------------");
        logger.info("Executing beforeEach: Navigating to LoginPage");
        await loginPage.navigateToLoginPage();
    });

    test('TC_AUTH_001 - Should login successfully with valid credentials', async ({ loginPage }) => {
        logger.info("Starting Test: TC_AUTH_001 - Should login successfully with valid credentials");
        try {
            await loginPage.login(authData.validUser.userName, authData.validUser.password);
            await loginPage.validateSuccessfulLogin();
        } catch (error) {
            logger.error(`Error in TC_AUTH_001: ${error}`);
            throw error;
        }
    });

    test('TC_AUTH_002 - Should show error for locked out user', async ({ loginPage }) => {
        logger.info("Starting Test: TC_AUTH_002 - Should show error for locked out user");
        try {
            await loginPage.login(authData.lockedOutUser.userName, authData.lockedOutUser.password);
            await loginPage.validateErrorMessage(authData.lockedOutUser.errorMessage);
        } catch (error) {
            logger.error(`Error in TC_AUTH_002: ${error}`);
            throw error;
        }
    });

    test('TC_AUTH_003 - Should show error for invalid username/password', async ({ loginPage }) => {
        logger.info("Starting Test: TC_AUTH_003 - Should show error for invalid username/password");
        try {
            await loginPage.login(authData.invalidCredentials.userName, authData.invalidCredentials.password);
            await loginPage.validateErrorMessage(authData.invalidCredentials.errorMessage);
        } catch (error) {
            logger.error(`Error in TC_AUTH_003: ${error}`);
            throw error;
        }
    });

    test('TC_AUTH_004 - Should show error when username is empty', async ({ loginPage }) => {
        logger.info("Starting Test: TC_AUTH_004 - Should show error when username is empty");
        try {
            await loginPage.login(authData.emptyUserName.userName, authData.emptyUserName.password);
            await loginPage.validateErrorMessage(authData.emptyUserName.errorMessage);
        } catch (error) {
            logger.error(`Error in TC_AUTH_004: ${error}`);
            throw error;
        }
    });

    test('TC_AUTH_005 - Should show error when password is empty', async ({ loginPage }) => {
        logger.info("Starting Test: TC_AUTH_005 - Should show error when password is empty");
        try {
            await loginPage.login(authData.emptyPassword.userName, authData.emptyPassword.password);
            await loginPage.validateErrorMessage(authData.emptyPassword.errorMessage);
        } catch (error) {
            logger.error(`Error in TC_AUTH_005: ${error}`);
            throw error;
        }
    });

    test('TC_AUTH_006 - Should show error when both fields are empty', async ({ loginPage }) => {
        logger.info("Starting Test: TC_AUTH_006 - Should show error when both fields are empty");
        try {
            await loginPage.login(authData.emptyFields.userName, authData.emptyFields.password);
            await loginPage.validateErrorMessage(authData.emptyFields.errorMessage);
        } catch (error) {
            logger.error(`Error in TC_AUTH_006: ${error}`);
            throw error;
        }
    });
});