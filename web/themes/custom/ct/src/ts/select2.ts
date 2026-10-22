/**
 * Enhance select lists with Select2. Select2 and jQuery are provided by Drupal
 * (see the `select2` library), so they are used as globals here.
 */
export function initSelect2(root: Document = document): void {
  jQuery('.form-select', root).select2();
  root.querySelectorAll('.select2-selection--single').forEach((element) => {
    element
      .querySelector('.select2-selection__rendered')
      ?.classList.add('select2-selection--single__rendered');
  });
}

jQuery(() => initSelect2());
