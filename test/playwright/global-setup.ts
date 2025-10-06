/// <reference types="node" />
import { chromium, type FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Dismiss cookie banner and persist consent for all tests.
export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use?.baseURL as string | undefined;
  const storageStatePath = path.resolve(__dirname, 'playwright/.auth/cookie-consent.json');

  const browser = await chromium.launch({
    headless: true,
    ignoreHTTPSErrors: true,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  const url = baseURL || 'https://contribtracker.ddev.site';
  await page.goto(url, { waitUntil: 'load' });

  const el = page.locator('.cookiesjsr-banner--action .allowAll').first();
  if (await el.count()) {
    try {
      await el.click({ trial: false, timeout: 2000 });
    } catch {
      // try next selector
    }
  }

  // Ensure directory exists and save cookies/localStorage for reuse across tests.
  fs.mkdirSync(path.dirname(storageStatePath), { recursive: true });
  await context.storageState({ path: storageStatePath });
  await browser.close();
}


