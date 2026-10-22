/**
 * Enhances select lists with Select2. Select2 and jQuery are loaded by Drupal
 * (see the `select2` library in ct.libraries.yml).
 */
(function (Drupal, once, $) {
  Drupal.behaviors.ctSelect2 = {
    attach(context) {
      once('ct-select2', '.form-select', context).forEach((select) => {
        $(select).select2();
      });
    },
  };
})(Drupal, once, jQuery);
