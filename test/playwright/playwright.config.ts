/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  globalSetup: './global-setup',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  timeout: 30_000,
  expect: { timeout: 10_000 },

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || 'https://contribtracker.ddev.site',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 800 },

    ignoreHTTPSErrors: true,
    storageState: path.resolve(__dirname, 'playwright/.auth/cookie-consent.json'),
  },

  /* Configure projects for major browsers */
  projects: [
    // ultra-fast feedback on commit
    {
      name: 'smoke-desktop',
      grep: /@smoke/,
      grepInvert: /@slow|@expensive|@flaky/,
      use: { ...devices['Desktop Chrome'] },
      retries: 0,
      timeout: 20_000,
    },

    // default PR gate
    {
      name: 'core-desktop',
      grep: /@fast|@medium/,
      grepInvert: /@expensive|@flaky/,
      use: { ...devices['Desktop Chrome'] },
      retries: 1,
      timeout: 30_000,
    },

    // scheduled/nightly depth
    {
      name: 'regression-chromium',
      grep: /@regression|@slow|@visual/,
      use: { ...devices['Desktop Chrome'], trace: 'retain-on-failure', video: 'on', screenshot: 'on' },
      retries: 2,
      timeout: 45_000,
    },
    {
      name: 'regression-webkit',
      grep: /@regression|@slow/,
      use: { ...devices['Desktop Safari'] },
      retries: 2,
      timeout: 45_000,
    },

    // optional mobile smoke
    {
      name: 'mobile-smoke',
      grep: /@smoke|@mobile/,
      use: { ...devices['iPhone 14'] },
      retries: 0
    },

    // Percy
    {
      name: 'percy',
      grep: /@percy/,
      use: { ...devices['Desktop Chrome'] },
      retries: 0,
      timeout: 45_000,
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
