import fs from 'fs';
import path from 'path';
import { logger } from './logger';

const failedTestsLogPath = path.join(__dirname, '..', 'log', 'failed-tests.txt');

/**
 * Log the test status. If the test failed, record its ID in a new log file.
 * @param testCaseId The test case identifier (e.g., 'TC_AUTH_001')
 * @param status The outcome of the test ('passed' or 'failed')
 */
export const logTestStatus = (testCaseId: string, status: 'passed' | 'failed') => {
    logger.info(`Test Case: ${testCaseId} | Status: ${status}`);

    if (status === 'failed') {
        const logContent = `${testCaseId}\n`;
        // Append the failed test ID to the log file
        fs.appendFileSync(failedTestsLogPath, logContent, 'utf8');
    }
};

/**
 * Clears the failed tests log file. Used before a fresh run.
 */
export const clearFailedTestsLog = () => {
    if (fs.existsSync(failedTestsLogPath)) {
        fs.writeFileSync(failedTestsLogPath, ''); // Empties the file
        logger.info('Cleaned up previous failed tests log.');
    }
};
