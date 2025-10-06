import { test, expect } from '@playwright/test';

test.describe('XSS Attack Simulation in Form Fields Verification @security', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should not execute XSS payload in form fields', async ({ page }) => {
    const xssPayload = '<script>alert("XSS")</script>';

    const dialogs: string[] = [];
    page.on('dialog', async (dialog) => {
      dialogs.push(dialog.message());
      await dialog.dismiss().catch(() => {});
    });

    await page.locator('input#edit-title').fill(xssPayload);
    await page.locator('input#edit-uid').fill(xssPayload);
    await page.locator('input#edit-submit-all-contributions').click();

    // Ensure no alert dialog with XSS message appeared
    expect(dialogs.find((d) => d.includes('XSS'))).toBeUndefined();
  });
});


