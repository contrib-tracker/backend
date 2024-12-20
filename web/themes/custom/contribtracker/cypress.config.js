import { defineConfig } from 'cypress';
import grepPlugin from '@cypress/grep/src/plugin.js';
export default defineConfig({
  projectId: 'contrib-tracker',
  chromeWebSecurity: false, // To Bypass Same-Origin Policy - Useful for social-media-link-check test
  video: process.env.CYPRESS_VIDEO !== 'false', // Defaults to true unless explicitly set to 'false'
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://contrib.axelerant.com', // Default to prod url if no base URL is set
    env: {
      grepTags: '',
    },
    setupNodeEvents(on, config) {
      grepPlugin(config); // Use the imported plugin directly
      return config;
    },
  },
});
