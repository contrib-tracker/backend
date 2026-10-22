import { countByDate, daysHtml, monthsHtml, type Day } from './graph';

/**
 * On a user profile (/user/{uid}), fetch that user's daily contribution counts
 * and draw the contribution graph.
 */
Drupal.behaviors.contribGraph = {
  attach(context) {
    const [days] = once('contrib-graph', '#days', context as HTMLElement);
    const months = document.getElementById('month');
    const uid = /\/user\/(\d+)/.exec(window.location.href)?.[1];
    if (!days || !months || !uid) return;

    fetch(`/user/${Drupal.checkPlain(uid)}/graph`)
      .then((response) => response.json() as Promise<Record<string, Day>>)
      .then((data) => {
        const today = new Date();
        months.innerHTML = monthsHtml(today);
        days.innerHTML = daysHtml(today, countByDate(data), Drupal.t('contributions on'));
      })
      .catch(() => {
        // Leave the graph empty when the data cannot be loaded.
      });
  },
};
