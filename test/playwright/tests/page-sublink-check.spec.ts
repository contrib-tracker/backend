import { test, expect } from '@playwright/test';
import { acceptCookiesIfBanner } from '../utils';

test.describe('Main Page Sublinks Response Code Validation @expensive', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfBanner(page).catch(() => {});
  });

  test('should validate the response codes for header links', async ({ page }) => {
    await validateResponseCodes(page, 'header a');
  });

  test('should validate the response codes for main links', async ({ page }) => {
    // TODO: implement admin login if required for specific links
    await validateResponseCodes(page, 'main a');
  });

  test('should validate the response codes for footer links', async ({ page }) => {
    await validateResponseCodes(page, 'footer a:not(.social__sharing a)');
  });
});

async function validateResponseCodes(page: import('@playwright/test').Page, sectionSelector: string) {
  const links = page.locator(sectionSelector);
  const count = await links.count();
  const failed: Array<{ link: string; status: number }> = [];

  for (let i = 0; i < count; i++) {
    const href = await links.nth(i).getAttribute('href');
    if (!href) continue;
    const response = await page.request.get(href, { failOnStatusCode: false });
    const status = response.status();
    if (![200, 301, 302].includes(status)) {
      failed.push({ link: href, status });
    }
  }

  expect(failed, `Failed URLs: ${failed.map(f => `Link: ${f.link}, Status: ${f.status}`).join('\n')}`).toHaveLength(0);
}


