import { test, expect } from '@playwright/test';

test.describe('Form Filter Validation with Positive and Negative Scenarios @fast @smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show right results on name input', async ({ page }) => {
    const firstContributor = page.locator('.contrib__card_contributer').first();
    const text = (await firstContributor.textContent())?.trim() || '';
    expect(text.length).toBeGreaterThan(0);

    await page.locator('#edit-uid').fill(text);
    await expect(page.locator('#edit-submit-all-contributions')).toHaveValue('Apply');
    await page.locator('#edit-submit-all-contributions').click();

    const contributors = page.locator('.contrib__card_contributer');
    await expect(contributors.first()).toBeVisible();
    const count = await contributors.count();
    for (let i = 0; i < count; i++) {
      await expect(contributors.nth(i)).toHaveText(text);
    }
  });

  test('should show no results for incorrect name input', async ({ page }) => {
    await page.locator('#edit-uid').fill('NonExistentName');
    await expect(page.locator('#edit-submit-all-contributions')).toHaveValue('Apply');
    await page.locator('#edit-submit-all-contributions').click();
    await expect(page.locator('.contrib__card_contributer')).toHaveCount(0);
  });

  test('should show no results for excessively long name input', async ({ page }) => {
    const longName = 'a'.repeat(100);
    await page.locator('#edit-uid').fill(longName);
    await expect(page.locator('#edit-submit-all-contributions')).toHaveValue('Apply');
    await page.locator('#edit-submit-all-contributions').click();
    await expect(page.locator('.contrib__card_contributer')).toHaveCount(0);
  });

  test('should show no results for numerical name input', async ({ page }) => {
    await page.locator('#edit-uid').fill('1234567890');
    await expect(page.locator('#edit-submit-all-contributions')).toHaveValue('Apply');
    await page.locator('#edit-submit-all-contributions').click();
    await expect(page.locator('.contrib__card_contributer')).toHaveCount(0);
  });

  test('should show no results for special characters in name input', async ({ page }) => {
    await page.locator('#edit-uid').fill('!@#$%^&*()');
    await expect(page.locator('#edit-submit-all-contributions')).toHaveValue('Apply');
    await page.locator('#edit-submit-all-contributions').click();
    await expect(page.locator('.contrib__card_contributer')).toHaveCount(0);
  });

  test('should show right results on title input', async ({ page }) => {
    const firstTitle = page.locator('.contrib__card_title>a').first();
    const text = (await firstTitle.textContent())?.trim() || '';
    expect(text.length).toBeGreaterThan(0);

    await page.locator('#edit-title').fill(text);
    await expect(page.locator('#edit-submit-all-contributions')).toHaveValue('Apply');
    await page.locator('#edit-submit-all-contributions').click();

    const titles = page.locator('.contrib__card_title>a');
    await expect(titles.first()).toBeVisible();
    const count = await titles.count();
    for (let i = 0; i < count; i++) {
      await expect(titles.nth(i)).toContainText(text, { ignoreCase: true });
    }
  });

  test('should show no results for incorrect title input', async ({ page }) => {
    await page.locator('#edit-title').fill('NonExistentTitle');
    await expect(page.locator('#edit-submit-all-contributions')).toHaveValue('Apply');
    await page.locator('#edit-submit-all-contributions').click();
    await expect(page.locator('.contrib__card_title>a')).toHaveCount(0);
  });

  test('should show no results for special characters in title input', async ({ page }) => {
    await page.locator('#edit-title').fill('!@#$%^&*()');
    await expect(page.locator('#edit-submit-all-contributions')).toHaveValue('Apply');
    await page.locator('#edit-submit-all-contributions').click();
    await expect(page.locator('.contrib__card_title>a')).toHaveCount(0);
  });

  test('should show no results for numerical title input', async ({ page }) => {
    await page.locator('#edit-title').fill('1234567890');
    await expect(page.locator('#edit-submit-all-contributions')).toHaveValue('Apply');
    await page.locator('#edit-submit-all-contributions').click();
    await expect(page.locator('.contrib__card_title>a')).toHaveCount(0);
  });

  test('should show right results on technology selection', async ({ page }) => {
    await page.locator('#select2-edit-field-contribution-technology-target-id-container').click();
    await page.locator('li.select2-results__option--selectable').nth(1).click();
    await expect(page.locator('#edit-submit-all-contributions')).toHaveValue('Apply');
    await page.locator('#edit-submit-all-contributions').click();

    const selectedTitle = await page
      .locator("[class*='contribution-technology'] .select2-selection__rendered")
      .getAttribute('title');

    const tagText = (await page.locator('.contrib__card_tags > a').first().textContent())?.trim();
    expect(selectedTitle).toBe(tagText);
  });
});


