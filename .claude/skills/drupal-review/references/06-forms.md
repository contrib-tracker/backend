# Form API

## Form Class Hierarchy

| Class | Use when |
|---|---|
| `FormBase` | General-purpose forms without config |
| `ConfigFormBase` | Module settings that map to a config object |
| `EntityForm` | Forms for entity create/edit/delete (auto-wires entity) |
| `ConfirmFormBase` | Confirmation before a destructive operation |

## Basic Form Pattern

```php
namespace Drupal\my_module\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ExampleForm extends FormBase {

  public static function create(ContainerInterface $container): static {
    return new static($container->get('my_module.my_service'));
  }

  public function __construct(protected readonly MyService $myService) {}

  // Must be globally unique. Convention: module_name_form_name
  public function getFormId(): string {
    return 'my_module_example_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state): array {
    $form['title'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Title'),
      '#required'      => TRUE,
      '#default_value' => $form_state->getValue('title', ''),
      '#maxlength'     => 255,
    ];
    $form['body'] = [
      '#type'  => 'textarea',
      '#title' => $this->t('Body'),
      '#rows'  => 5,
    ];
    $form['actions'] = ['#type' => 'actions'];
    $form['actions']['submit'] = [
      '#type'  => 'submit',
      '#value' => $this->t('Save'),
    ];
    return $form;
  }

  public function validateForm(array &$form, FormStateInterface $form_state): void {
    $title = $form_state->getValue('title');
    if (strlen($title) < 3) {
      $form_state->setErrorByName('title', $this->t('Title must be at least 3 characters.'));
    }
  }

  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $title = $form_state->getValue('title');
    $this->myService->save($title);
    $this->messenger()->addStatus($this->t('Saved successfully.'));
    $form_state->setRedirectUrl(\Drupal\Core\Url::fromRoute('my_module.list'));
  }
}
```

## ConfigFormBase Pattern

```php
class SettingsForm extends ConfigFormBase {

  protected function getEditableConfigNames(): array {
    return ['my_module.settings'];
  }

  public function getFormId(): string {
    return 'my_module_settings_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state): array {
    $config = $this->config('my_module.settings');
    $form['salutation'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Salutation'),
      '#default_value' => $config->get('salutation'),
    ];
    return parent::buildForm($form, $form_state); // adds Save button
  }

  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $this->config('my_module.settings')
      ->set('salutation', $form_state->getValue('salutation'))
      ->save();
    parent::submitForm($form, $form_state); // adds success message
  }
}
```

## Common Form Element Types

| `#type` | Description |
|---|---|
| `textfield` | Single-line text input |
| `textarea` | Multi-line text |
| `password` | Password field (not stored in form state) |
| `email` | Email input (`type="email"`); server-side validation still applies |
| `number` | Numeric input |
| `url` | URL input |
| `select` | Dropdown (`#options` array required) |
| `radios` | Radio buttons (`#options` array required) |
| `checkboxes` | Multiple checkboxes (`#options` array required) |
| `checkbox` | Single checkbox |
| `date` | Date picker |
| `managed_file` | File upload with Drupal file management |
| `link` | URL + title field pair |
| `machine_name` | Auto-generated machine-readable name |
| `details` | Collapsible fieldset |
| `fieldset` | Non-collapsible grouping |
| `container` | Invisible wrapper (`#tree` for nested values) |
| `actions` | Standard action buttons container |
| `submit` | Submit button |
| `hidden` | Hidden input |
| `token` | CSRF token (auto-added by Form API) |
| `table` | Table with draggable rows |
| `item` | Read-only display value |

## Validation Rules

- Run validation in `validateForm()`, not `submitForm()`.
- Use `$form_state->setErrorByName('element_name', $message)` — ties error display to the specific field.
- Use `$form_state->setError($form['element'], $message)` for nested elements.
- If any `setError*()` is called, `submitForm()` is not executed.
- For field-level validation in entity forms, implement `#element_validate` callbacks or constraints.
- **Never rely on HTML5 client-side validation** (`#required`, `#pattern`, `type="number"`). Drupal 12 disables it by default (`$settings['enable_html5_validation'] = FALSE`; the setting disappears in 13), so the browser no longer blocks submission. Every rule must be enforced in `validateForm()` or a constraint.

## AJAX Forms

```php
$form['type'] = [
  '#type'    => 'select',
  '#options' => $options,
  '#ajax'    => [
    'callback' => [$this, 'typeChangeCallback'],
    'wrapper'  => 'type-dependent-wrapper',
    'event'    => 'change',
    'progress' => ['type' => 'throbber', 'message' => NULL],
  ],
];

// The wrapper div that gets replaced
$form['dependent'] = [
  '#type'   => 'container',
  '#prefix' => '<div id="type-dependent-wrapper">',
  '#suffix' => '</div>',
  '#tree'   => TRUE,
];

// AJAX callback — returns the element to replace the wrapper
public function typeChangeCallback(array &$form, FormStateInterface $form_state): array {
  return $form['dependent'];
}
```

**Rules:**
- The callback must return a render array — the wrapper div content is replaced with this.
- Use `$form_state->isRebuilding()` or `$form_state->getTriggeringElement()` to detect AJAX vs full submit.
- Use `$form_state->setRebuild()` to trigger a form rebuild without actually submitting.

## States API (Client-Side Behavior)

```php
// Show field only when checkbox is checked
$form['extra'] = [
  '#type'   => 'textfield',
  '#title'  => $this->t('Extra'),
  '#states' => [
    'visible' => [
      ':input[name="enable_extra"]' => ['checked' => TRUE],
    ],
  ],
];

// Multiple conditions (AND)
'visible' => [
  ':input[name="field_a"]' => ['value' => 'yes'],
  ':input[name="field_b"]' => ['checked' => TRUE],
],

// OR condition
'visible' => [
  [':input[name="field_a"]' => ['value' => 'yes']],
  [':input[name="field_b"]' => ['value' => 'also_yes']],
],
```

Available states: `visible`, `invisible`, `enabled`, `disabled`, `required`, `optional`, `checked`, `unchecked`, `expanded`, `collapsed`.

## Managed File Upload

```php
$form['file'] = [
  '#type'              => 'managed_file',
  '#title'             => $this->t('CSV file'),
  '#upload_location'   => 'public://imports/',
  // Constraint plugin IDs; the file_validate_*() callbacks were removed in 11.
  '#upload_validators' => [
    'FileExtension' => ['extensions' => 'csv'],
    'FileSizeLimit' => ['fileLimit' => 25 * 1024 * 1024], // 25MB
  ],
  '#default_value'     => $this->configuration['file_fid'] ? [$this->configuration['file_fid']] : [],
];

// In submitForm() — mark file as permanent
$fid = $form_state->getValue('file')[0] ?? NULL;
if ($fid) {
  $file = \Drupal\file\Entity\File::load($fid);
  $file->setPermanent();
  $file->save();
}
```

## Altering Another Module's Form

Form alters are `#[Hook]` methods (see `14-oop-hooks.md`). Submit and validate callbacks point at methods on the same class; the hook class is a service, so `[$this, 'method']` is a valid, serialisable callable.

```php
// src/Hook/MyModuleFormHooks.php
namespace Drupal\my_module\Hook;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Session\AccountProxyInterface;

class MyModuleFormHooks {

  public function __construct(
    private readonly AccountProxyInterface $currentUser,
  ) {}

  // hook_form_FORM_ID_alter() — preferred over the generic form_alter.
  #[Hook('form_node_article_form_alter')]
  public function nodeArticleFormAlter(array &$form, FormStateInterface $form_state, string $form_id): void {
    $form['field_internal_notes']['#access'] = $this->currentUser->hasPermission('administer nodes');
    $form['actions']['submit']['#submit'][] = [$this, 'nodeArticleSubmit'];
    $form['#validate'][] = [$this, 'nodeArticleValidate'];
  }

  public function nodeArticleValidate(array &$form, FormStateInterface $form_state): void {}

  public function nodeArticleSubmit(array &$form, FormStateInterface $form_state): void {
    // Additional processing after the entity is saved.
  }

}
```

Several `form_alter` implementations per module are allowed; split by concern instead of one giant method with `if ($form_id === ...)` chains.

## Form Routing

Either in `*.routing.yml`:

```yaml
my_module.settings:
  path: '/admin/config/system/my-module'
  defaults:
    _form: '\Drupal\my_module\Form\SettingsForm'
    _title: 'My Module Settings'
  requirements:
    _permission: 'administer site configuration'
```

Or (11.5+) as a class-level attribute on the form, which must live in the module's `Form` namespace:

```php
use Drupal\Core\Routing\Attribute\Route;

#[Route(
  path: '/admin/config/system/my-module',
  name: 'my_module.settings',
  title: new TranslatableMarkup('My Module Settings'),
  requirements: ['_permission' => 'administer site configuration'],
)]
class SettingsForm extends ConfigFormBase {}
```

## Key Rules Summary

- Use `$this->t()` everywhere — never bare `t()` inside a class method.
- `getFormId()` must return a globally unique string across all modules.
- Validate in `validateForm()`, not `submitForm()`.
- Redirect in `submitForm()` via `$form_state->setRedirectUrl()` — never with `header()`.
- Use `ConfigFormBase` (not `FormBase`) for module configuration settings — it handles the "saved" message and editable config tracking.
- Add `$form['actions']['#type'] = 'actions'` to group action buttons — themes style this properly.
