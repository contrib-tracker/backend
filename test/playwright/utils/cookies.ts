import type { Page } from '@playwright/test';

/**
 * Clicks the cookie "Accept All" button if the banner is present.
 * Returns true if a click was performed, false otherwise.
 */
export async function acceptCookiesIfBanner(page: Page, options?: { timeoutMs?: number }): Promise<boolean> {
  const timeoutMs = options?.timeoutMs ?? 2000;

  // Candidate locators ordered from most semantic to more specific.
  const candidates: Array<() => import('@playwright/test').Locator> = [
    () => page.locator('#cookiesjsr').getByRole('button', { name: /accept\s*all|allow\s*all|accept\s*all\s*cookies|accept\s*cookies/i }).first(),
    () => page.getByRole('button', { name: /accept\s*all|allow\s*all|accept\s*all\s*cookies|accept\s*cookies/i }).first(),
    () => page.locator('#cookiesjsr button.allowAll').first(),
    () => page.locator('.cookiesjsr-banner--action .allowAll').first(),
    () => page.locator('[data-testid="accept-all-cookies"]').first(),
  ];

  for (const getLocator of candidates) {
    const locator = getLocator();
    try {
      if ((await locator.count()) === 0) continue;
      await locator.click({ timeout: timeoutMs });
      return true;
    } catch {
      // Try next candidate.
    }
  }
  return false;
}


