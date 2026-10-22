import { describe, expect, it } from 'vite-plus/test';
import { activityLevel, countByDate, daysHtml, formatDay, monthsHtml, parseDate } from './graph';

// Wednesday, 21 October 2026 (local time).
const today = new Date(2026, 9, 21);

describe('formatDay', () => {
  it('formats like the previous moment.js "dddd, MMMM Do YYYY"', () => {
    expect(formatDay(new Date(2026, 9, 21))).toBe('Wednesday, October 21st 2026');
    expect(formatDay(new Date(2026, 0, 2))).toBe('Friday, January 2nd 2026');
    expect(formatDay(new Date(2026, 0, 3))).toBe('Saturday, January 3rd 2026');
    expect(formatDay(new Date(2026, 0, 11))).toBe('Sunday, January 11th 2026');
    expect(formatDay(new Date(2026, 0, 22))).toBe('Thursday, January 22nd 2026');
  });
});

describe('parseDate', () => {
  it('parses date-only values as local dates', () => {
    expect(parseDate('2026-10-21')).toEqual(today);
    expect(parseDate('2026-10-21T00:00:00')).toEqual(today);
  });

  it('rejects anything else', () => {
    expect(parseDate(undefined)).toBeNull();
    expect(parseDate('yesterday')).toBeNull();
  });
});

describe('countByDate', () => {
  it('ignores rows without a date, such as the response cache metadata', () => {
    const counts = countByDate({
      0: { field_contribution_date: '2026-10-20', nid_count: '3' },
      '#cache': {} as never,
    });
    expect([...counts.values()]).toEqual([3]);
  });
});

describe('activityLevel', () => {
  it('caps at four', () => {
    expect([0, 1, 2, 3, 4, 9].map(activityLevel)).toEqual([0, 1, 2, 3, 4, 4]);
  });
});

describe('monthsHtml', () => {
  it('lists the current month and the next twelve', () => {
    const items = monthsHtml(today).match(/<li>(\w+)<\/li>/g) ?? [];
    expect(items).toHaveLength(13);
    expect(items[0]).toBe('<li>Oct</li>');
    expect(items[12]).toBe('<li>Oct</li>');
  });
});

describe('daysHtml', () => {
  const counts = countByDate({ 0: { field_contribution_date: '2026-10-20', nid_count: '2' } });
  const html = daysHtml(today, counts, 'contributions on');

  it('pads the first week and draws 366 days, newest first', () => {
    expect(html.match(/class='offset'/g)).toHaveLength(6 - today.getDay());
    expect(html.match(/btn--tooltip/g)).toHaveLength(366);
    expect(html).toContain('data-title="0 contributions on Wednesday, October 21st 2026"');
  });

  it('applies the day count and heat level', () => {
    expect(html).toContain(
      'data-title="2 contributions on Tuesday, October 20th 2026" data-activity="2"',
    );
  });
});
