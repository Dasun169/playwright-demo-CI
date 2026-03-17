# Playwright Test Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-1.40-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Allure](https://img.shields.io/badge/Allure-2.0-orange.svg)

## 📋 Overview
This is a comprehensive Playwright test automation framework for testing SauceDemo application. It includes test cases for authentication flow and checkout process with Allure reporting integration.
## 🏗️ Project Structure
```bash
playwright-demo-CI/
├── src/
│ ├── pages/ # Page Object Models
│ │ ├── CartPage.ts
│ │ ├── CheckoutComplete.ts
│ │ ├── CheckoutStepOnePage.ts
│ │ ├── CheckoutStepTwoPage.ts
│ │ ├── HomePage.ts
│ │ └── LoginPage.ts
│ ├── tests/ # Test files
│ │ ├── auth.spec.ts # Authentication tests
│ │ └── checkout.spec.ts # Checkout process tests
│ └── utils/ # Utilities
│ ├── logger.ts
│ ├── testStatusTracker.ts
│ ├── globalSetup.ts
│ └── test_data/
│ ├── authData.ts
│ ├── checkoutData.ts
│ └── userData.ts
├── configs/
│ └── .env.stag # Environment configuration
├── logs/ # Test execution logs
├── reports/ # Test reports
├── fixtures/
│ └── fixture.ts # Playwright fixtures
├── playwright.config.ts # Playwright configuration
├── package.json # Dependencies and scripts
├── run-failed-tests.js # Failed tests retry script
└── Dockerfile # Docker configuration
```
## 🚀 Prerequisites
- Node.js 18+
- npm or yarn
- Java 11+ (for Allure reports)
- Git
- Docker (optional, for containerized execution)
## 💻 Local Setup
### 1. Clone the Repository
```bash
git clone https://github.com/Dasun169/playwright-demo-CI.git
cd playwright-demo-CI
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Install Playwright Browsers
```bash
npx playwright install --with-deps chromium firefox webkit
```
### 4. Environment Configuration
Create environment files in the configs folder:
configs/.env.stag
```bash
BASE_URL=https://www.saucedemo.com
TEMPUSERNAME=standard_user
PASSWORD=secret_sauce
```
## 🧪 Running Tests
### Run Tests by Tag
```bash
# Run smoke tests
npm run test:chrome:ci -- @smoke

# Run regression tests
npm run test:chrome:ci -- @regression

# Run sanity tests
npm run test:chrome:ci -- @sanity
```
### Run Tests by Browser
```bash
# Chrome
npm run test:chrome:ci -- @smoke

# Firefox
npm run test:firefox:ci -- @regression

# Webkit
npm run test:webkit:ci -- @smoke

# Mobile Chrome
npm run test:mobile-chrome:ci -- @regression

# Mobile Safari
npm run test:mobile-safari:ci -- @smoke

# Microsoft Edge
npm run test:edge:ci -- @regression

# Google Chrome
npm run test:google-chrome:ci -- @smoke
```
### Run Specific Test Case
```bash
# Run specific test by ID
npx playwright test --grep "TC_AUTH_001" --project=chromium

# Run multiple test cases
npx playwright test --grep "TC_AUTH_001|TC_CHK_001" --project=chromium
```
### Run All Tests
```bash
# Run all tests in Chrome
npm run test:chrome:ci

# Run all tests across all browsers
npx playwright test --all-browsers
```
## 📊 Allure Reports
### Generate and View Allure Report
```bash
# Generate Allure report
npm run allure:generate

# Open Allure report
npm run allure:open

# Serve Allure report
npm run allure:serve
```
### Allure Report Features
- Overview Dashboard: Test execution summary
- Test Cases: Detailed test results with steps
- Timeline: Test execution timeline
- Categories: Grouped by test tags
- Graphs: Visual representation of results
- Behaviors: Test grouping by business functionality
## 📝 Test Cases
### Authentication Tests (TC_AUTH_*)
| Test ID       | Description                          | Tags                   |
|--------------|--------------------------------------|------------------------|
| TC_AUTH_001  | Login with valid credentials         | @regression @sanity    |
| TC_AUTH_002  | Error for locked out user            | @regression @sanity    |
| TC_AUTH_003  | Error for invalid credentials        | @regression @sanity    |
| TC_AUTH_004  | Error when username empty            | @regression @sanity    |
| TC_AUTH_005  | Error when password empty            | @regression @sanity    |
| TC_AUTH_006  | Error when both fields empty         | @regression @sanity    |
### Checkout Tests (TC_CHK_*)
| Test ID      | Description                          | Tags                 |
|--------------|--------------------------------------|----------------------|
| TC_CHK_001   | Full checkout workflow               | @regression @smoke   |
| TC_CHK_002   | Home page element visibility         | @regression @smoke   |
| TC_CHK_003   | Hamburger menu about navigation      | @regression @smoke   |
| TC_CHK_004   | Hamburger menu logout navigation     | @regression @smoke   |
| TC_CHK_005   | Continue Shopping button             | @regression @smoke   |
| TC_CHK_006   | Remove item from cart                | @regression @smoke   |
| TC_CHK_007   | Checkout step one cancel             | @regression          |
| TC_CHK_008   | Checkout step two elements           | @regression          |
| TC_CHK_009   | Checkout step two cancel             | @regression          |
| TC_CHK_010   | Checkout complete elements           | @regression          |
| TC_CHK_011   | Footer text and links                | @regression          |
| TC_CHK_012   | Footer Facebook navigation           | @regression          |
| TC_CHK_013   | Footer Twitter navigation            | @regression          |
| TC_CHK_014   | Footer LinkedIn navigation           | @regression          |
| TC_CHK_015   | Direct home page access error        | @regression          |
| TC_CHK_016   | Direct cart page access error        | @regression          |
| TC_CHK_017   | Direct checkout step one error       | @regression          |
| TC_CHK_018   | Direct checkout step two error       | @regression          |
| TC_CHK_019   | Direct checkout complete error       | @regression          |
| TC_CHK_020   | Logout from home page                | @regression @smoke   |
| TC_CHK_021   | Empty first name error               | @regression          |
| TC_CHK_022   | Empty last name error                | @regression          |
| TC_CHK_023   | Empty postal code error              | @regression          |
## 🔧 Utilities
### Logger
The framework uses Winston for logging:
```bash
import { logger } from '../utils/logger';

logger.info('Test execution started');
logger.error('Error occurred during test');
```
Logs are saved to:
- logs/test-log.log - All test logs
- Console output during execution
### Test Status Tracker
Tracks test execution status and maintains failed tests for retry:
```bash
import { logTestStatus, clearFailedTestsLog } from '../utils/testStatusTracker';

// Log test status
logTestStatus('TC_AUTH_001', 'passed');
logTestStatus('TC_AUTH_002', 'failed');

// Clear failed tests log before new run
clearFailedTestsLog();
```
### Fixtures
Page Object Models are injected using Playwright fixtures:
```bash
import { test, expect } from '../../fixtures/fixture';

test('Example test', async ({ loginPage, homePage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');
    await homePage.validateHomePage();
});
```
## Docker Setup
### Build Docker Image
```bash
# Build image
docker build -t playwright-demo-ci:latest .

# Run tests in container
docker run --rm playwright-demo-ci:latest
```
### Docker Image Features
- Node.js 20 slim base image
- Java 17 for Allure reports
- Playwright browsers pre-installed
- Allure reporting configured
- Volume mounting for logs and reports
## 📁 Logs and Reports
### Log Files
| File                     | Description                       |
|--------------------------|-----------------------------------|
| logs/test-log.log         | Application logs                  |
| logs/failed-tests.txt     | Failed test IDs for retry         |
| logs/raw-console.log      | Raw console output                |
| logs/execution-summary.log| Test execution summary            |
### Report Directories
| Directory                     | Description                          |
|-------------------------------|--------------------------------------|
| `reports/playwright-report/`   | HTML Playwright report               |
| `reports/allure-report/`       | Allure report files                  |
| `test-results/`                | Test artifacts (screenshots, videos)|
## 🔄 Failed Tests Retry Mechanism
The framework includes automatic retry for failed tests:
1. Failed test IDs are logged to logs/failed-tests.txt
2. Run node run-failed-tests.js to retry only failed tests
3. Tests are executed with the same configuration
```bash
# Retry failed tests
node run-failed-tests.js
```
## 📦 Package.json Scripts
```bash
{
  "scripts": {
    "test:chrome:ci": "npx playwright test --project=chromium --grep",
    "test:firefox:ci": "npx playwright test --project=firefox --grep",
    "test:webkit:ci": "npx playwright test --project=webkit --grep",
    "test:mobile-chrome:ci": "npx playwright test --project='Mobile Chrome' --grep",
    "test:mobile-safari:ci": "npx playwright test --project='Mobile Safari' --grep",
    "test:edge:ci": "npx playwright test --project='Microsoft Edge' --grep",
    "test:google-chrome:ci": "npx playwright test --project='Google Chrome' --grep",
    "allure:generate": "allure generate reports/allure-report/allure-results --clean -o reports/allure-report/html",
    "allure:open": "allure open reports/allure-report/html",
    "allure:serve": "allure serve reports/allure-report/allure-results"
  }
}
```
## 🏗️ Pipeline Architecture
```bash
┌─────────────────┐      ┌─────────────────┐     ┌─────────────────┐
│ GitHub Repo     │───▶ │ Jenkins Job 1   │────▶│ Docker Hub      │
│ (Source Code)   │      │ (Build Image)   │     │ (Image Store)   │
└─────────────────┘      └─────────────────┘     └────────┬────────┘
                                                          │
                                                          ▼
┌─────────────────┐     ┌─────────────────┐      ┌─────────────────┐
│ Allure Report   │◀────│ Jenkins Job 2   │◀────│ Pull Image      │
│ & Artifacts     │     │ (Run Tests)     │      │                 │
└─────────────────┘     └─────────────────┘      └─────────────────┘
```
### Job Parameters Explained
| Parameter   | Options                                                                 | Description                  |
|------------|-------------------------------------------------------------------------|------------------------------|
| TEST_TAG    | @smoke, @regression, @sanity, (empty)                                   | Filter tests by tag          |
| PROJECT     | chromium, firefox, webkit, Mobile Chrome, Mobile Safari, Microsoft Edge, Google Chrome | Browser/device to test       |
## 📊 Accessing Allure Reports
After successful test execution:
1. Go to the Jenkins job page
2. Click on the build number
3. Click on Allure Report link in the left menu
4. View the comprehensive test report
### Allure Report Sections
- Overview: Summary of test execution
- Categories: Tests grouped by status
- Suites: Test suites and cases
- Graphs: Visual representation
- Timeline: Execution timeline
- Behaviors: Tests by feature/behavior
## 📁 Archived Artifacts
The pipeline archives the following artifacts:
| Artifact          | Location                  | Description                        |
|------------------|---------------------------|------------------------------------|
| Test Logs         | `logs/*.log`              | Application logs                   |
| Raw Console       | `logs/raw-console.log`    | Full console output                 |
| Execution Summary | `logs/execution-summary.log` | Test summary                      |
| Allure Results    | `allure-results/*.json`   | Raw Allure data                     |
| Test Reports      | `test-reports/**/*`       | Test artifacts (screenshots, videos) |
## 📊 Sample Test Output
```bash
2026-03-17 10:26:23 info: ----------------------------------------------------------
2026-03-17 10:26:23 info: Starting Test: TC_AUTH_001 - Should login successfully with valid credentials
2026-03-17 10:26:24 info: Login page navigated successfully
2026-03-17 10:26:25 info: Login to home page successful
2026-03-17 10:26:25 info: Home page validated successfully
2026-03-17 10:26:26 info: Test Case: TC_AUTH_001 | Status: passed

Running 7 tests using 1 worker
7 passed (54.3s)
```
## 🛠️ Technology Stack
| Technology | Purpose                        |
|-----------|--------------------------------|
| Playwright | Test automation framework      |
| TypeScript | Programming language           |
| Allure     | Test reporting                 |
| Winston    | Logging                        |
| Docker     | Containerization               |
| Jenkins    | CI/CD orchestration            |
| GitHub     | Source code management         |
| Docker Hub | Image registry                 |
## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit changes (git commit -m 'Add some AmazingFeature')
4. Push to branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
