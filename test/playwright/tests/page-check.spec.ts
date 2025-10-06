import { test, expect } from '@playwright/test';
import urls from '../fixtures/page-check-urls.json';

test.describe('Visual Testing @percy', () => {
  for (const key of Object.keys(urls)) {
    const { url, userType } = (urls as any)[key];

    test(`Visits ${key} page and takes Percy snapshot`, async ({ page }) => {
      // TODO: Implement login if userType === 'admin'
      if (userType === 'admin') {
        test.skip();
      }

      const resp = await page.request.get(url);
      expect(resp.ok()).toBeTruthy();

      await page.addInitScript(() => {
        (window as any).beforeReload = true;
      });

      await page.goto(url);

      await page.evaluate(() => (window as any).beforeReload);
      // Scroll to trigger lazy components
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);

      // Percy snapshot if available
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const percy = require('@percy/playwright');
      if (percy?.percySnapshot) {
        await percy.percySnapshot(page, `${key} page`);
      }
    });
  }
});


