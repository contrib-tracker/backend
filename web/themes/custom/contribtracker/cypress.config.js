import { defineConfig } from 'cypress';
import { readFileSync } from 'fs';
import neatCSV from 'neat-csv';
import path from 'path';
import cypressGrep from 'cypress-grep/src/plugin';
// import cypressSplit from "cypress-split"; // Uncomment if you are using cypress-split

export default defineConfig({
  projectId: 'contrib-tracker',
  viewportWidth: 1512,
  viewportHeight: 1200,
  watchForFilesChanges: false,
  chromeWebSecurity: false,
  defaultCommandTimeout: 60000,
  execTimeout: 10000,
  pageLoadTimeout: 500000,
  requestTimeout: 90000,
  responseTimeout: 90000,
  experimentalStudio: true,
  trashAssetsBeforeRuns: false,
  experimentalShadowDomSupport: true,
  reporter: 'mochawesome',
  reporterOptions: {
    useInlineDiffs: true,
    embeddedScreenshots: true,
    reportDir: 'cypress/results',
    reportFilename: '[name].html',
    overwrite: true,
    html: true,
    json: true,
    charts: true,
  },
  e2e: {
    async setupNodeEvents(on, config) {
      const inputFileName = config.env.inputTestFile;
      console.log('loading file', inputFileName);
      const text = readFileSync(inputFileName, 'utf8');
      const csv = await neatCSV(text);
      console.log('loaded the urls');

      cypressGrep(on, config);
      const version = config.env.version || 'stage';
      // Load env from json using dynamic import
      const envConfigPath = path.resolve(`./cypress/config/${version}.json`);
      const envConfig = JSON.parse(readFileSync(envConfigPath, 'utf-8'));
      config.env = { ...config.env, ...envConfig };
      // Change baseUrl
      config.baseUrl = config.env.baseUrl;
      console.log(config.baseUrl);
      config.env.urlsList = csv;
      // cypressSplit(on, config); // Uncomment if you are using cypress-split
      return config;
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
