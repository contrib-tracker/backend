import { describe, expect, it, vi } from 'vite-plus/test';

// Wednesday, 21 October 2026 (local time).
const today = new Date(2026, 9, 21);

Object.assign(globalThis, {
  Drupal: {
    behaviors: {},
    t: (/** @type {string} */ text) => text,
    checkPlain: (/** @type {string} */ text) => text,
  },
  // Mirrors core/once: an element is handed out once per id.
  once: (
    /** @type {string} */ id,
    /** @type {string} */ selector,
    /** @type {ParentNode} */ context,
  ) =>
    [...context.querySelectorAll(selector)].filter((element) => {
      const ids = (element.getAttribute('data-once') ?? '').split(' ').filter(Boolean);
      if (ids.includes(id)) return false;
      element.setAttribute('data-once', [...ids, id].join(' '));
      return true;
    }),
});
// @ts-expect-error A classic script: it registers itself on the Drupal global.
await import('./contribution-graph.js');
/** @type {any} */
// @ts-expect-error Set by the script under test.
const graph = globalThis.Drupal.ctContributionGraph;

describe('formatDay', () => {
  it('uses ordinal suffixes', () => {
    expect(graph.formatDay(new Date(2026, 9, 21))).toBe('Wednesday, October 21st 2026');
    expect(graph.formatDay(new Date(2026, 0, 2))).toBe('Friday, January 2nd 2026');
    expect(graph.formatDay(new Date(2026, 0, 3))).toBe('Saturday, January 3rd 2026');
    expect(graph.formatDay(new Date(2026, 0, 11))).toBe('Sunday, January 11th 2026');
  });
});

describe('parseDate', () => {
  it('reads date-only values as local dates', () => {
    expect(graph.parseDate('2026-10-21')).toEqual(today);
    expect(graph.parseDate('2026-10-21T00:00:00')).toEqual(today);
  });

  it('rejects anything else', () => {
    expect(graph.parseDate(undefined)).toBeNull();
    expect(graph.parseDate('yesterday')).toBeNull();
  });
});

describe('countByDate', () => {
  it('ignores rows without a date, such as the response cache metadata', () => {
    const counts = graph.countByDate({
      0: { field_contribution_date: '2026-10-20', nid_count: '3' },
      '#cache': {},
    });
    expect([...counts.values()]).toEqual([3]);
  });
});

describe('activityLevel', () => {
  it('caps at four', () => {
    expect([0, 1, 2, 3, 4, 9].map(graph.activityLevel)).toEqual([0, 1, 2, 3, 4, 4]);
  });
});

describe('buildDays', () => {
  const counts = graph.countByDate({
    0: { field_contribution_date: '2026-10-20', nid_count: '2' },
  });
  const list = document.createElement('ol');
  list.append(graph.buildDays(today, counts, 'contributions on'));
  const cells = [...list.querySelectorAll('li:not(.contribution-graph__cell--blank)')];

  it('draws 366 days oldest first, ending today', () => {
    expect(cells).toHaveLength(366);
    expect(cells.at(-1)?.getAttribute('data-title')).toBe(
      '0 contributions on Wednesday, October 21st 2026',
    );
  });

  it('pads the first week so the first day lands on its weekday row', () => {
    const first = graph.daysUpTo(today)[0];
    expect(list.querySelectorAll('.contribution-graph__cell--blank')).toHaveLength(first.getDay());
  });

  it('applies the day count and heat level', () => {
    const day = cells.at(-2);
    expect(day?.getAttribute('data-title')).toBe('2 contributions on Tuesday, October 20th 2026');
    expect(day?.getAttribute('data-activity')).toBe('2');
  });
});

describe('buildMonths', () => {
  it('labels each month on the week column where it starts', () => {
    const wrap = document.createElement('div');
    wrap.append(graph.buildMonths(today));
    const labels = [...wrap.querySelectorAll('span')];
    expect(labels.map((l) => l.textContent)).toContain('Oct');
    expect(labels.length).toBeGreaterThanOrEqual(12);
    const columns = labels.map((l) => Number(l.style.gridColumnStart));
    expect(columns).toEqual([...columns].sort((a, b) => a - b));
  });
});

describe('behavior', () => {
  it('leaves the placeholder when there is no user in the URL', () => {
    document.body.innerHTML =
      '<div data-contribution-graph><div data-graph-months>x</div><div data-graph-days>y</div></div>';
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    // @ts-expect-error Drupal is a global here.
    globalThis.Drupal.behaviors.ctContributionGraph.attach(document, {});
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(document.querySelector('[data-graph-days]')?.textContent).toBe('y');
  });
});
