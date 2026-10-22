/**
 * Mobile navigation: the burger toggles the sidebar menu.
 */
export function initNavigation(root: Document = document): void {
  const sideBar = root.querySelector('.nav__sidebar-menu');
  const burger = root.querySelector('.nav__burger');
  const branding = root.querySelector('.branding');

  burger?.addEventListener('click', () => {
    branding?.querySelector('a')?.classList.add('nav__sidebar-menu_link');
    root.querySelector('.nav__item-account')?.classList.add('nav__sidebar_ul-account');
    sideBar?.querySelector('.nav__auth-link')?.classList.add('nav__sidebar_auth-link');
    sideBar?.querySelector('.nav__item')?.classList.add('nav__sidebar_item');
    sideBar?.classList.toggle('is-visible');
  });
}

initNavigation();
