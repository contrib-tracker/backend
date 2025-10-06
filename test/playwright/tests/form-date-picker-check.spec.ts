import { test, expect } from '@playwright/test';

type DateParts = { day: string; month: string; year: number; formatted: string };

function getRandomDate(start: string, end: string): DateParts {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const randomDate = new Date(
    startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()),
  );
  const day = `0${randomDate.getUTCDate()}`.slice(-2);
  const month = `0${randomDate.getUTCMonth() + 1}`.slice(-2);
  const year = randomDate.getUTCFullYear();
  return { day, month, year, formatted: `${year}-${month}-${day}` };
}

function getMinMaxDates(start: string, end: string): { minDate: DateParts; maxDate: DateParts } {
  const minDate = getRandomDate(start, end);
  const minDateObj = new Date(minDate.formatted);
  let maxDate: DateParts;
  do {
    maxDate = getRandomDate(minDate.formatted, end);
  } while (new Date(maxDate.formatted) < minDateObj);
  return { minDate, maxDate };
}

function parseDisplayedDate(dayText: string, monthYearText: string): Date {
  const monthMap: Record<string, number> = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
  };
  const [monthAbbr, yearStr] = monthYearText.split(' ');
  const month = monthMap[monthAbbr];
  const year = Number(yearStr);
  return new Date(Date.UTC(year, month - 1, Number(dayText)));
}

test.describe('Date Picker Filter Validation with Random Date Selection @medium', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show right results on date selection', async ({ page }) => {
    const { minDate, maxDate } = getMinMaxDates('2023-01-01', '2023-12-31');

    const minSelector = "[class*='date-value-min'] .bef-datepicker";
    const maxSelector = "[class*='date-value-max'] .bef-datepicker";

    await page.locator(minSelector).click();
    await page.locator(minSelector).fill(minDate.formatted);
    await page.locator(minSelector).blur();

    await page.locator(maxSelector).click();
    await page.locator(maxSelector).fill(maxDate.formatted);
    await page.locator(maxSelector).blur();

    await expect(page.locator('#edit-submit-all-contributions')).toHaveValue('Apply');
    await page.locator('#edit-submit-all-contributions').click();

    const cards = page.locator('.contrib__card_date');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const dayText = (await card.locator('.contrib__card_date__day').textContent())?.trim() || '';
      const monthYearText = (await card.locator('.contrib__card_date__month--year').textContent())?.trim() || '';
      const displayedDate = parseDisplayedDate(dayText, monthYearText);
      const minDateObj = new Date(Date.UTC(minDate.year, Number(minDate.month) - 1, Number(minDate.day)));
      const maxDateObj = new Date(Date.UTC(maxDate.year, Number(maxDate.month) - 1, Number(maxDate.day)));
      expect(displayedDate.getTime()).toBeGreaterThanOrEqual(minDateObj.getTime());
      expect(displayedDate.getTime()).toBeLessThanOrEqual(maxDateObj.getTime());
    }
  });
});


