# Security

## XSS (Cross-Site Scripting) Prevention

### Twig Auto-Escaping (Theme Layer)

```twig
{# SAFE — Twig auto-escapes all variables #}
{{ user_name }}
{{ node.title.value }}

{# UNSAFE — bypasses escaping. NEVER use on user input #}
{{ user_supplied_html|raw }}

{# SAFE — |raw is acceptable only on content already sanitized by Drupal #}
{{ body.value|raw }}   {# body.value is already filtered through text format #}
```

**Rule:** Trust Twig's auto-escaping. Do not escape data before passing it to Twig — that causes double-escaping. Only use `|raw` on content that has already been run through a Drupal text format filter or `Xss::filter()`.

### PHP Sanitization

```php
use Drupal\Component\Utility\Html;
use Drupal\Component\Utility\Xss;
use Drupal\Component\Utility\UrlHelper;

// Strictest — plain text only, escapes everything
$safe = Html::escape($user_input);

// Allow a basic safe subset of HTML tags
$safe = Xss::filter($user_html);

// Allow all HTML except dangerous tags (for trusted admin content)
$safe = Xss::filterAdmin($admin_html);

// Strip dangerous URL protocols (javascript:, data:, etc.)
$safe_url = UrlHelper::filterBadProtocol($user_url);
```

**When to use which:**
- `Html::escape()` — plain text output (user names, titles shown as plain text)
- `Xss::filter()` — user-supplied HTML where some markup is expected (comments, descriptions)
- `Xss::filterAdmin()` — only for input from trusted administrators
- **Never pass user input to `t()`** — the translation function trusts its input

### Render API Safety

```php
// #markup passes through Xss::filterAdmin() automatically
$build['#markup'] = $some_html;   // safe

// #plain_text runs through Html::escape() automatically
$build['#plain_text'] = $user_text;  // safe

// Direct markup — must be a Markup object (trusted HTML)
use Drupal\Core\Render\Markup;
$build['#markup'] = Markup::create('<strong>Trusted HTML</strong>');

// TranslatableMarkup from t() is already a Markup object — safe
$build['#markup'] = t('Hello <strong>@name</strong>', ['@name' => $user_name]);
// @name placeholder HTML-escapes the variable; %name wraps in <em>; :name is URL-safe
```

## SQL Injection Prevention

```php
// NEVER — user input concatenated into SQL
$database->query("SELECT * FROM {users} WHERE name = '$username'"); // DANGEROUS

// ALWAYS use placeholders
$database->query(
  "SELECT * FROM {users_field_data} WHERE [name] = :name",
  [':name' => $username]
);

// Query builder conditions are always parameterized automatically
$database->select('users_field_data', 'u')
  ->fields('u')
  ->condition('u.name', $username)  // safe
  ->execute();
```

**Rules:**
- Every value from user input, URL parameters, or external sources must go through a placeholder or condition.
- Use entity queries (`entityTypeManager()->getStorage()->getQuery()`) for entity data — they are always safe.
- Add the `node_access` tag to queries that surface node data to users.

## CSRF Protection

### Form API (Automatic)

All forms rendered through the Form API include a CSRF token automatically. No manual action needed.

### Callback Routes (Links, Confirmation Actions)

```yaml
# Route definition
my_module.delete_item:
  path: '/item/{id}/delete'
  defaults:
    _controller: 'Drupal\my_module\Controller\ItemController::delete'
  requirements:
    _permission: 'delete items'
    _csrf_token: 'TRUE'         # Add this to any state-changing GET/link route
```

When building the link URL, Drupal automatically appends the token:

```php
$url = Url::fromRoute('my_module.delete_item', ['id' => $item->id()]);
// $url->toString() will include ?token=CSRF_TOKEN automatically
```

**Rules:**
- Add `_csrf_token: 'TRUE'` to every route that performs a state change via GET request.
- Never perform state-changing operations on a plain GET route without CSRF protection.
- For programmatic token use: `$token = \Drupal::service('csrf_token')->get('my_value')` and validate with `->validate($token, 'my_value')`.

## Access Control

### Permissions

```yaml
# my_module.permissions.yml
administer my feature:
  title: 'Administer my feature'
  restrict access: true   # Shows a warning in the UI about admin-level access

view my feature:
  title: 'View my feature content'

# Dynamic permissions (per-bundle)
permission_callbacks:
  - \Drupal\my_module\MyPermissions::permissions
```

**Least Privilege Principle:**
- Grant users only the permissions they need for their role.
- Separate "view", "create", "edit", "delete" permissions — don't combine into one.
- Use content moderation transition permissions rather than direct "publish" permissions.
- Never give content editors `administer site configuration` or similar admin permissions.

### Access in Routes vs Code

```php
// CORRECT — access in route requirements
// WRONG — access check buried in controller
class MyController extends ControllerBase {
  public function page(): array {
    // Don't do this:
    if (!\Drupal::currentUser()->hasPermission('my permission')) {
      throw new AccessDeniedHttpException();
    }
    // Do this instead: put _permission in routing.yml
    return $build;
  }
}
```

Exception: dynamic access based on runtime data (e.g., "only the owner can edit") belongs in the entity access control handler, not route requirements.

## File Security

### Public vs Private Files

```php
// Public files — accessible via direct URL, no access check
$uri = 'public://uploads/document.pdf';  // URL: /sites/default/files/uploads/document.pdf

// Private files — access gated through Drupal's permission system
$uri = 'private://confidential/document.pdf';  // URL: /system/files/confidential/document.pdf
```

**Use private files for:**
- Financial documents (invoices, reports)
- HR documents
- Research papers behind authentication
- Any file that should only be accessible to users who can access the associated content

**Rule:** Files uploaded to the public filesystem remain accessible via direct URL even after removing all references from content. If a document should be restricted, it must be in the private filesystem from the start.

### Private File Access Control

```php
// src/Hook/MyModuleFileHooks.php — hook_file_download() controls access to private files
#[Hook('file_download')]
public function fileDownload(string $uri): array|int {
  if (str_starts_with($uri, 'private://confidential/')) {
    if (!$this->currentUser->hasPermission('access confidential files')) {
      return -1;  // deny
    }
    return ['Content-Type' => 'application/pdf'];  // allow
  }
  return [];  // no opinion
}
```

Since 12.0 dangerous characters in uploaded filenames are replaced by core; do not rely on that alone, keep validating extensions with the `FileExtension` constraint.

## Code Integrity

### Never Hack Core or Contrib

```bash
# WRONG — modifying core or contrib files directly
vim web/core/modules/node/src/NodeAccessControlHandler.php

# CORRECT — use patches
# In composer.json:
{
  "extra": {
    "patches": {
      "drupal/some_module": {
        "Fix bug description": "patches/fix-bug.patch"
      }
    }
  }
}
```

Use `cweagans/composer-patches` for patch management. Patches are transparent, tracked in Git, and applied automatically on `composer install`.

### Trusted Host Patterns

In `settings.php`:

```php
$settings['trusted_host_patterns'] = [
  '^www\.example\.com$',
  '^example\.com$',
];
```

The Drupal status page (`/admin/reports/status`) warns if this is not configured.

## Hashing and Randomness

Drupal 12's PHPStan configuration reports `md5()`, `sha1()`, `crc32()` and `hash()` with weak algorithms as errors, and `uniqid()` is never acceptable for tokens.

```php
use Drupal\Component\Utility\Crypt;

// Cache IDs, fingerprints, deduplication — fast, non-cryptographic
$cid = 'my_module:' . hash('xxh3', serialize($params));

// Tokens, signatures, anything an attacker could guess or forge
$token = Crypt::randomBytesBase64(32);
$signature = Crypt::hmacBase64($data, $secret);
$digest = Crypt::hashBase64($data);   // sha256 under the hood
```

Password hashing is argon2id by default in Drupal 12. Existing bcrypt hashes keep working and are rehashed on next login. Only set `password.algorithm: 2y` (container parameter) when the PHP build lacks argon2 support.

## Form Spam Prevention

For public-facing forms:

- **Honeypot** (`drupal/honeypot`) — hidden field that bots fill in; legitimate users don't
- **CAPTCHA** (`drupal/captcha`) — challenge-response test
- **Antibot** — JavaScript-based bot detection

Install at least Honeypot on any site with publicly accessible forms (contact, registration, comment).

## Logging and Auditing

```php
// Inject a logger channel
use Psr\Log\LoggerInterface;

// Via service (preferred)
$this->logger->notice('User @user deleted item @id', [
  '@user' => $account->getDisplayName(),
  '@id'   => $item->id(),
]);

// Severity levels: emergency, alert, critical, error, warning, notice, info, debug
$this->logger->error('Failed to process item @id: @message', [
  '@id'      => $item->id(),
  '@message' => $e->getMessage(),
]);

// Exception logging — watchdog_exception() was removed in Drupal 11
use Drupal\Core\Utility\Error;
Error::logException($this->logger, $e);                       // error level, full context
Error::logException($this->logger, $e, level: LogLevel::WARNING);
```

Never log user-supplied values with `@` placeholders into messages that are later rendered as HTML without escaping; `@` placeholders are escaped by the logger channel, raw string concatenation is not.

**Production logging:**
- Disable `dblog` (Database Logging) module — it grows the database and slows backups.
- Enable `syslog` module instead — integrates with enterprise log aggregation.
- Keep `dblog` enabled on development/staging only.
