import { test, expect } from '@playwright/test';
import { acceptCookiesIfBanner } from '../utils';

test.describe('Hover Actions Verification @fast', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await acceptCookiesIfBanner(page).catch(() => {});
  });

  test('should change the element style on hover for contrib tracker logo', async ({ page }) => {
    const logo = page.locator('.nav__container a.link.branding__link');
    await expect(logo).toHaveCSS('color', 'rgba(236, 75, 6, 0.933)');
    await logo.hover();
    await expect(logo).toHaveCSS('color', 'rgb(109, 104, 104)');
  });

  test('should change the element style on hover for login with google link', async ({ page }) => {
    const link = page.locator('.nav__auth-link').nth(1);
    await expect(link).toHaveCSS('color', 'rgba(236, 75, 6, 0.933)');
    await link.hover();
    await expect(link).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(link).toHaveCSS('background-color', 'rgba(236, 75, 6, 0.933)');
  });
});


