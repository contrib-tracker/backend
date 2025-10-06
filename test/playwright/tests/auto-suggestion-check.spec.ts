import { test, expect } from '@playwright/test';
import { acceptCookiesIfBanner } from '../utils';

test.describe('Form Auto-Suggestions Validation with Extracted User Name @fast', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfBanner(page).catch(() => {});
  });
  test('should show auto-suggestions when typing the first user name', async ({ page }) => {
    await page.goto('/');

    const firstUser = page.locator('.contrib__card_contributer').first();
    const userName = (await firstUser.textContent())?.trim() || '';
    expect(userName.length).toBeGreaterThan(0);

    const input = page.locator('#edit-uid');
    await input.fill(userName);

    const suggestions = page.locator('.ui-menu-item');
    await expect(suggestions.first()).toBeVisible();
    await expect(await suggestions.count()).toBeGreaterThan(0);

    await expect(page.locator('.ui-menu-item>a').first()).toContainText(userName);
    await page.locator('.ui-menu-item>a').first().click();

    await expect(page.locator('#edit-submit-all-contributions')).toHaveValue('Apply');
    await page.locator('#edit-submit-all-contributions').click();

    const contributors = page.locator('.contrib__card_contributer');
    await expect(contributors.first()).toBeVisible();
    const count = await contributors.count();
    for (let i = 0; i < count; i++) {
      await expect(contributors.nth(i)).toHaveText(userName);
    }
  });
});


