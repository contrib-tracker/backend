import { beforeEach, describe, expect, it } from 'vite-plus/test';

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
await import('./site-header.js');

const markup = `
  <header data-site-header>
    <button type="button" class="site-header__toggle" aria-expanded="false"></button>
    <div class="site-header__nav" id="site-header-nav"><a href="/">Home</a></div>
  </header>`;

/** @returns {{ toggle: HTMLButtonElement, nav: HTMLElement }} */
function setUp() {
  document.body.innerHTML = markup;
  // @ts-expect-error Drupal is a global here.
  globalThis.Drupal.behaviors.ctSiteHeader.attach(document, {});
  return {
    toggle: /** @type {HTMLButtonElement} */ (document.querySelector('.site-header__toggle')),
    nav: /** @type {HTMLElement} */ (document.querySelector('.site-header__nav')),
  };
}

describe('site header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('opens and closes the navigation with the button', () => {
    const { toggle, nav } = setUp();

    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(nav.classList.contains('is-open')).toBe(true);

    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(nav.classList.contains('is-open')).toBe(false);
  });

  it('closes on Escape and returns focus to the button', () => {
    const { toggle, nav } = setUp();
    toggle.click();

    nav.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(nav.classList.contains('is-open')).toBe(false);
    expect(document.activeElement).toBe(toggle);
  });

  it('only wires up a header once', () => {
    const { toggle, nav } = setUp();
    // Attaching again (as Drupal does after AJAX) must not add a second listener.
    // @ts-expect-error Drupal is a global here.
    globalThis.Drupal.behaviors.ctSiteHeader.attach(document, {});
    toggle.click();
    expect(nav.classList.contains('is-open')).toBe(true);
  });
});
