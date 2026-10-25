import { test, expect } from '@playwright/test';
import { acceptCookiesIfBanner } from '../utils';
import urls from '../fixtures/page-check-urls.json';

test.describe('Visual Testing @percy', () => {
  for (const key of Object.keys(urls)) {
    const { url: startUrl, userType, follow } = (urls as any)[key];

    test(`Visits ${key} page and takes Percy snapshot`, async ({ page }) => {
      // TODO: Implement login if userType === 'admin'
      if (userType === 'admin') {
        test.skip();
      }

      // The content is a sample of production, so a page that depends on a
      // specific node is found by following a link instead of hardcoding it.
      let url = startUrl;
      if (follow) {
        await page.goto(startUrl);
        url = (await page.locator(follow).first().getAttribute('href')) || startUrl;
      }

      const resp = await page.request.get(url);
      expect(resp.ok()).toBeTruthy();

      await page.addInitScript(() => {
        (window as any).beforeReload = true;
      });

      await page.goto(url);
      await acceptCookiesIfBanner(page).catch(() => {});

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


