import { clearFailedTestsLog } from './testStatusTracker';

async function globalSetup() {
    // Clear out the failed test log at the beginning of each run
    clearFailedTestsLog();
}

export default globalSetup;
