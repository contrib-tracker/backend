import { test, expect } from '@playwright/test';
import { acceptCookiesIfBanner } from '../utils';

test.describe('Form Reset Button Validation with Positive and Negative Scenarios @medium', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfBanner(page).catch(() => {});
  });

  test('should reset the form with valid data entry', async ({ page }) => {
    const firstUser = page.locator('.contrib__card_contributer').first();
    const userName = (await firstUser.textContent())?.trim() || '';
    expect(userName.length).toBeGreaterThan(0);

    await page.locator('#edit-uid').fill(userName);
    await expect(page.locator('#edit-submit-all-contributions')).toHaveValue('Apply');
    await page.locator('#edit-submit-all-contributions').click();

    await expect(page.locator('#edit-uid')).toHaveValue(userName);

    await expect(page.locator('#edit-reset-all-contributions')).toHaveValue('Reset');
    await page.locator('#edit-reset-all-contributions').click();

    await expect(page.locator('#edit-uid')).toHaveValue('');

    const resetExists = await page.locator('#edit-reset-all-contributions').count();
    expect(resetExists).toBe(0);
  });
});


