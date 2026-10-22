/**
 * Contribution graph helpers: a year of daily contribution counts for a user.
 */
export type Day = { field_contribution_date?: string; nid_count?: string | number };

const weekdayFormat = new Intl.DateTimeFormat('en', { weekday: 'long' });
const monthShortFormat = new Intl.DateTimeFormat('en', { month: 'short' });
const monthLongFormat = new Intl.DateTimeFormat('en', { month: 'long' });

const DAYS_SHOWN = 366;
const MONTHS_SHOWN = 13;

function ordinal(day: number): string {
  const tens = day % 100;
  if (tens >= 11 && tens <= 13) return `${day}th`;
  return `${day}${['th', 'st', 'nd', 'rd'][day % 10] ?? 'th'}`;
}

/** "Tuesday, October 21st 2026" */
export function formatDay(date: Date): string {
  return `${weekdayFormat.format(date)}, ${monthLongFormat.format(date)} ${ordinal(date.getDate())} ${date.getFullYear()}`;
}

/** Local midnight for a "YYYY-MM-DD" value, or null when it is not a date. */
export function parseDate(value: string | undefined): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value ?? '');
  return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null;
}

/** Contribution counts keyed by "YYYY-MM-DD". */
export function countByDate(data: Record<string, Day>): Map<string, number> {
  const counts = new Map<string, number>();
  for (const item of Object.values(data)) {
    const date = parseDate(item?.field_contribution_date);
    if (date) counts.set(dateKey(date), Number(item.nid_count) || 0);
  }
  return counts;
}

function dateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

/** Month labels for the current month and the following twelve. */
export function monthsHtml(today: Date): string {
  const items = Array.from({ length: MONTHS_SHOWN }, (_, i) => {
    const month = new Date(today.getFullYear(), today.getMonth() + i, 1);
    return `<li>${monthShortFormat.format(month)}</li>`;
  });
  return `<ol class='month'>${items.join('')}</ol>`;
}

/** Heat level (0-4) used by the stylesheet's data-activity selectors. */
export function activityLevel(count: number): number {
  return Math.min(count, 4);
}

/** One cell per day, newest first (the stylesheet lays them out), padded so weeks line up. */
export function daysHtml(today: Date, counts: Map<string, number>, label: string): string {
  const offset = 6 - today.getDay();
  const cells = Array.from({ length: offset }, () => "<li class='offset'></li>");

  for (let i = 0; i < DAYS_SHOWN; i++) {
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const count = counts.get(dateKey(day)) ?? 0;
    cells.push(
      `<li class='btn--tooltip' data-title="${count} ${label} ${formatDay(day)}" data-activity="${activityLevel(count)}"></li>`,
    );
  }
  return `<ol class='activity-chart--wd'>${cells.join('')}</ol>`;
}
