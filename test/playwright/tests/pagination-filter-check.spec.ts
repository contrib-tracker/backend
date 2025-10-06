import { test, expect, Page } from '@playwright/test';
import { acceptCookiesIfBanner } from '../utils';

test.describe('Pagination Handling and Validation @medium', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfBanner(page).catch(() => {});
  });
  test('should filter results with selected contribution type on each page', async ({ page }) => {
    await page.goto('/');

    const multi = page.locator('span.select2-selection--multiple');
    await expect(multi).toBeVisible();
    await multi.click();
    await page.locator('li[id*="-code_contribution"]').click();
    await multi.click();
    await page.locator('li[id*="non_code_contribution"]').click();

    await page.locator('input#edit-submit-all-contributions').click();

    await filterAssertion(page);
    await clickNextButton(page);
  });
});

async function filterAssertion(page: Page) {
  const selected = (await page.locator('.select2-selection__choice__display').allTextContents()).join('').trim();
  const types = page.locator('.contrib__card_type');
  const count = await types.count();
  for (let i = 0; i < count; i++) {
    const txt = (await types.nth(i).textContent())?.trim() || '';
    expect(txt).toBe(selected);
  }
}

async function clickNextButton(page: Page) {
  const nextCount = await page.locator('.pager__item--next').count();
  if (nextCount > 0) {
    await page.locator('.pager__item--next').first().click();
    await filterAssertion(page);
    await clickNextButton(page);
  } else {
    expect(await page.locator('.pager__item--next').count()).toBe(0);
  }
}
