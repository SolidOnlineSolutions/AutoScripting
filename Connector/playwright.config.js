const { defineConfig, devices } = require('@playwright/test');
const authFile = '.auth/user.json';
const assert = require('assert');
const SFTP = require('ssh2-sftp-client');
const fs = require('fs');
const otplib = require('otplib');
const xlsx = require('xlsx');
const { AllureReporter } = require('allure-playwright'); // Import AllureReporter
require('dotenv').config();

const config = defineConfig({
  testDir: './tests',
  timeout: 80 * 1000,

  expect: {
    timeout: 25000,
  },

  reporter: [
    ['html'], // Keep the HTML reporter as an array
    ['allure-playwright', { outputDir: 'allure-results' }] // Specify Allure as a tuple
  ],

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on',
    launchOptions: {
      args: ['--auth-server-allowlist="*"'],
    },
  },

  projects: [
    {
      name: 'setup',
      testMatch: 'Auth.Setup.js',
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
      dependencies: ['setup'],
    },
  ],

  // Reference the global setup file here
  globalSetup: './global-setup.js',
});

module.exports = config;
