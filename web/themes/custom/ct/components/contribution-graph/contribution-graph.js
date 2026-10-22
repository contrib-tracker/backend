/**
 * Draws the contribution graph on a user profile: one cell per day for the
 * last year, in weeks, oldest on the left. Sunday is the top row.
 */
(function (Drupal, once) {
  const DAYS_SHOWN = 366;

  const weekdayFormat = new Intl.DateTimeFormat('en', { weekday: 'long' });
  const monthShortFormat = new Intl.DateTimeFormat('en', { month: 'short' });
  const monthLongFormat = new Intl.DateTimeFormat('en', { month: 'long' });

  /**
   * @param {number} day Day of the month.
   * @returns {string} The day with its ordinal suffix, such as 21st.
   */
  function ordinal(day) {
    const tens = day % 100;
    if (tens >= 11 && tens <= 13) return `${day}th`;
    return `${day}${['th', 'st', 'nd', 'rd'][day % 10] ?? 'th'}`;
  }

  /**
   * @param {Date} date
   * @returns {string} For example "Wednesday, October 21st 2026".
   */
  function formatDay(date) {
    return `${weekdayFormat.format(date)}, ${monthLongFormat.format(date)} ${ordinal(date.getDate())} ${date.getFullYear()}`;
  }

  /**
   * @param {string | undefined} value A "YYYY-MM-DD" value.
   * @returns {Date | null} Local midnight of that date, or null if it is not one.
   */
  function parseDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value ?? '');
    return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null;
  }

  /**
   * @param {Date} date
   * @returns {string}
   */
  function dateKey(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  /**
   * @param {Record<string, { field_contribution_date?: string, nid_count?: string | number }>} data
   *   The response of /user/{uid}/graph. It may contain non-row entries such
   *   as the cache metadata, which are ignored.
   * @returns {Map<string, number>} Contribution counts by date.
   */
  function countByDate(data) {
    const counts = new Map();
    for (const item of Object.values(data)) {
      const date = parseDate(item?.field_contribution_date);
      if (date) counts.set(dateKey(date), Number(item.nid_count) || 0);
    }
    return counts;
  }

  /**
   * @param {number} count
   * @returns {number} Heat level 0-4, matching the data-activity styles.
   */
  function activityLevel(count) {
    return Math.min(count, 4);
  }

  /**
   * The days to draw, oldest first, ending today.
   *
   * @param {Date} today
   * @returns {Date[]}
   */
  function daysUpTo(today) {
    return Array.from({ length: DAYS_SHOWN }, (_, i) => {
      return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - (DAYS_SHOWN - 1 - i),
      );
    });
  }

  /**
   * Builds the day cells, with blank cells in front so that the first day
   * lands on its weekday row.
   *
   * @param {Date} today
   * @param {Map<string, number>} counts
   * @param {string} label Translated text between the count and the date.
   * @returns {DocumentFragment}
   */
  function buildDays(today, counts, label) {
    const fragment = document.createDocumentFragment();
    const days = daysUpTo(today);

    for (let i = 0; i < days[0].getDay(); i++) {
      const blank = document.createElement('li');
      blank.className = 'contribution-graph__cell contribution-graph__cell--blank';
      fragment.append(blank);
    }

    for (const day of days) {
      const count = counts.get(dateKey(day)) ?? 0;
      const cell = document.createElement('li');
      cell.className = 'contribution-graph__cell';
      cell.dataset.activity = String(activityLevel(count));
      cell.dataset.title = `${count} ${label} ${formatDay(day)}`;
      fragment.append(cell);
    }
    return fragment;
  }

  /**
   * One label per month, placed on the week column where the month starts.
   *
   * @param {Date} today
   * @returns {DocumentFragment}
   */
  function buildMonths(today) {
    const days = daysUpTo(today);
    const lead = days[0].getDay();
    /** @type {{ day: Date, column: number }[]} */
    const labels = [];
    let previousMonth = -1;

    days.forEach((day, index) => {
      if (day.getMonth() !== previousMonth) {
        labels.push({ day, column: Math.floor((index + lead) / 7) + 1 });
        previousMonth = day.getMonth();
      }
    });
    // A first label squeezed against the second would overlap it.
    if (labels.length > 1 && labels[1].column - labels[0].column < 3) labels.shift();

    const fragment = document.createDocumentFragment();
    for (const { day, column } of labels) {
      const label = document.createElement('span');
      label.textContent = monthShortFormat.format(day);
      label.style.gridColumnStart = String(column);
      fragment.append(label);
    }
    return fragment;
  }

  Drupal.ctContributionGraph = {
    activityLevel,
    buildDays,
    buildMonths,
    countByDate,
    daysUpTo,
    formatDay,
    parseDate,
  };

  Drupal.behaviors.ctContributionGraph = {
    attach(context) {
      once('ct-contribution-graph', '[data-contribution-graph]', context).forEach((graph) => {
        const uid = /\/user\/(\d+)/.exec(window.location.href)?.[1];
        const months = graph.querySelector('[data-graph-months]');
        const days = graph.querySelector('[data-graph-days]');
        if (!uid || !months || !days) return;

        fetch(`/user/${Drupal.checkPlain(uid)}/graph`)
          .then((response) => response.json())
          .then((data) => {
            const today = new Date();
            months.replaceChildren(buildMonths(today));
            days.replaceChildren(buildDays(today, countByDate(data), Drupal.t('contributions on')));
            graph.dataset.ready = '';
          })
          .catch(() => {
            // Leave the placeholder in place when the data cannot be loaded.
          });
      });
    },
  };
})(Drupal, once);
