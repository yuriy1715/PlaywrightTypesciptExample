import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import * as path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
const getEnv = () => {
  if (process.env.TEST_ENV === 'dev') {
    return '.env.dev';
  } else if (process.env.TEST_ENV === 'stage') {
    return '.env.stage';
  } else {
    return '.env.dev';
  }
};
require('dotenv').config({
  path: path.join(__dirname, getEnv())
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./lib/globalSetup'),
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 480 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: false,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 20000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    //>>>>>>>>>>>>
    storageState: 'state.json',

    headless: true, //>>>>>>>>
    viewport: { width: 1920, height: 1080 },
    // headless: false, //>>>>>>>>
    launchOptions: {
      slowMo: 500
    },

    screenshot: {
      mode: 'only-on-failure',
      fullPage: true
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure'
    // trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      }
    }
    // {
    //     name: 'firefox',
    //     use: {
    //         ...devices['Desktop Firefox']
    //     }
    // }
    //
    // {
    //     name: 'webkit',
    //     use: {
    //         ...devices['Desktop Safari']
    //     }
    // }
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ]

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
