import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const markup = `
  <div class="branding"><a href="/">Home</a></div>
  <span class="nav__burger"></span>
  <ul class="nav__item-account"></ul>
  <nav class="nav__sidebar-menu"><a class="nav__auth-link"></a><ul class="nav__item"></ul></nav>`;

describe('navigation', () => {
  beforeEach(async () => {
    document.body.innerHTML = markup;
    // The module wires itself up on import, against the current document.
    vi.resetModules();
    await import('./navigation');
  });

  it('toggles the sidebar and adds the sidebar classes on burger click', () => {
    const burger = document.querySelector('.nav__burger') as HTMLElement;
    burger.click();

    expect(document.querySelector('.nav__sidebar-menu')?.classList.contains('is-visible')).toBe(
      true,
    );
    expect(
      document.querySelector('.branding a')?.classList.contains('nav__sidebar-menu_link'),
    ).toBe(true);
    expect(
      document.querySelector('.nav__item-account')?.classList.contains('nav__sidebar_ul-account'),
    ).toBe(true);
    expect(
      document.querySelector('.nav__auth-link')?.classList.contains('nav__sidebar_auth-link'),
    ).toBe(true);
    expect(document.querySelector('.nav__item')?.classList.contains('nav__sidebar_item')).toBe(
      true,
    );

    burger.click();
    expect(document.querySelector('.nav__sidebar-menu')?.classList.contains('is-visible')).toBe(
      false,
    );
  });
});
