/**
 * Opens and closes the navigation panel on small screens. On desktop the
 * navigation is always visible and the button is hidden by CSS.
 */
(function (Drupal, once) {
  Drupal.behaviors.ctSiteHeader = {
    attach(context) {
      once('ct-site-header', '[data-site-header]', context).forEach((header) => {
        const toggle = /** @type {HTMLButtonElement | null} */ (
          header.querySelector('.site-header__toggle')
        );
        const nav = header.querySelector('.site-header__nav');
        if (!toggle || !nav) return;

        /** @param {boolean} open */
        const setOpen = (open) => {
          toggle.setAttribute('aria-expanded', String(open));
          nav.classList.toggle('is-open', open);
        };

        toggle.addEventListener('click', () => {
          setOpen(toggle.getAttribute('aria-expanded') !== 'true');
        });

        header.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            setOpen(false);
            toggle.focus();
          }
        });
      });
    },
  };
})(Drupal, once);
