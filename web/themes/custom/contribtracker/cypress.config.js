import { defineConfig } from 'cypress';
import { readFileSync } from 'fs';
import path from 'path';
// import cypressSplit from "cypress-split"; // Uncomment if you are using cypress-split

export default defineConfig({
  projectId: 'contrib-tracker',
  viewportWidth: 1512,
  viewportHeight: 1200,
  watchForFilesChanges: false,
  chromeWebSecurity: false,
  defaultCommandTimeout: 60000,
  execTimeout: 10000,
  pageLoadTimeout: 200000,
  requestTimeout: 15000,
  responseTimeout: 10000,
  experimentalStudio: true,
  trashAssetsBeforeRuns: false,
  video: process.env.CYPRESS_VIDEO !== 'false', // Defaults to true unless explicitly set to 'false'
  experimentalShadowDomSupport: true,
  e2e: {
    async setupNodeEvents(on, config) {
      const version = config.env.version || 'dev';
      // Load env from json using dynamic import
      const envConfigPath = path.resolve(`./cypress/config/${version}.json`);
      const envConfig = JSON.parse(readFileSync(envConfigPath, 'utf-8'));
      config.env = { ...config.env, ...envConfig };
      // Change baseUrl
      config.baseUrl = config.env.baseUrl;
      console.log(config.baseUrl);
      // cypressSplit(on, config); // Uncomment if you are using cypress-split
      return config;
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
