import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'contrib-tracker',
  video: process.env.CYPRESS_VIDEO !== 'false', // Defaults to true unless explicitly set to 'false'
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://contrib.axelerant.com', // Default to prod url if no base URL is set
  },
});
