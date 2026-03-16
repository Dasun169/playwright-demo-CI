const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const failedTestsLogPath = path.join(__dirname, 'src', 'log', 'failed-tests.txt');

if (!fs.existsSync(failedTestsLogPath)) {
    console.log("✔ No failed tests log found. All previous tests likely passed!");
    process.exit(0);
}

// 2. Read the log file and parse IDs
const content = fs.readFileSync(failedTestsLogPath, 'utf8');
const failedTestIds = content.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

if (failedTestIds.length === 0) {
    console.log("✔ No failed test cases logged in the file. Everything looks good!");
    process.exit(0);
}

// 3. Remove duplicates (in case of automatic test retries saving duplicates)
const uniqueTestIds = [...new Set(failedTestIds)];

// 4. Construct the --grep regex pattern matching IDs exactly e.g. "TC_AUTH_001|TC_AUTH_002"
const grepPattern = uniqueTestIds.join('|');

console.log(`\n======================================================`);
console.log(`🔍 Discovered ${uniqueTestIds.length} failed test(s). Retrying now!`);
console.log(`📝 Pattern: "${grepPattern}"`);
console.log(`======================================================\n`);

try {
    // 5. Trigger the Playwright command with the passed IDs
    execSync(`npx playwright test --project "chromium" --grep "${grepPattern}"`, { stdio: 'inherit' });
} catch (error) {
    console.error("\n❌ Some tests still failed during this retry run. Check the log output.");
    process.exit(1);
}
