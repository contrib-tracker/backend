# Testing

## Test Types

| Type | Base Class | What runs | Use when |
|---|---|---|---|
| Unit | `UnitTestCase` | No Drupal bootstrap, no DB | Testing pure PHP logic (classes, algorithms) |
| Kernel | `KernelTestBase` | Minimal Drupal, schema installable | Testing services, entities, hooks, DB interactions |
| Functional | `BrowserTestBase` | Full Drupal install, browser emulation | Testing UI, routes, forms, access, full page rendering |
| FunctionalJavascript | `WebDriverTestBase` | Full install + Chrome/Selenium | Testing JavaScript, AJAX, dynamic UI |

**Drupal 12 requires PHPUnit 12.5.** Drupal 11.2–11.5 run PHPUnit 11. Simpletest is long gone; everything is PHPUnit.

### PHPUnit 12 Rules That Break Old Tests

- **Docblock annotations are ignored.** `@group`, `@covers`, `@dataProvider`, `@runInSeparateProcess` do nothing. A test with only annotations silently loses its group and data providers. Use `#[Group]`, `#[CoversClass]`/`#[CoversMethod]`, `#[DataProvider]`.
- **`#[RunTestsInSeparateProcesses]` is required on every concrete Kernel, Functional and FunctionalJavascript test class** (since 11.3). Base classes can no longer force isolation through their constructor.
- `setUp()`, `tearDown()` and all test methods declare `: void`.
- Data provider methods are `public static`.
- Missing native return types on methods that implement a core interface are reported as deprecations by the test runner (12.0).
- `TestRequirementsTrait::getDrupalRoot()` is deprecated; use `$this->root`.
- `SYMFONY_DEPRECATIONS_HELPER` no longer configures deprecation handling; configure the `DeprecationHandler` extension in `phpunit.xml` instead (see below).

Core ships two PHPStan rules that find leftover annotations. Add them to the project `phpstan.neon`:

```neon
rules:
  - Drupal\PHPStan\Rules\TestClassClassMetadata
  - Drupal\PHPStan\Rules\TestClassMethodMetadata
```

## Test File Locations and Namespaces

```
tests/src/Unit/MyTest.php           → namespace Drupal\Tests\my_module\Unit
tests/src/Kernel/MyKernelTest.php   → namespace Drupal\Tests\my_module\Kernel
tests/src/Functional/MyFuncTest.php → namespace Drupal\Tests\my_module\Functional
tests/src/FunctionalJavascript/MyJsTest.php → namespace Drupal\Tests\my_module\FunctionalJavascript
tests/modules/                      → helper test-only modules
```

## Unit Test

```php
declare(strict_types=1);

namespace Drupal\Tests\my_module\Unit;

use Drupal\my_module\Calculator;
use Drupal\Tests\UnitTestCase;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Group;

/**
 * Tests the Calculator class.
 */
#[CoversClass(Calculator::class)]
#[Group('my_module')]
final class CalculatorTest extends UnitTestCase {

  protected Calculator $calculator;

  protected function setUp(): void {
    parent::setUp();
    $this->calculator = new Calculator(10, 5);
  }

  public function testAdd(): void {
    $this->assertSame(15, $this->calculator->add());
  }

  #[DataProvider('providerSubtract')]
  public function testSubtract(int $a, int $b, int $expected): void {
    $this->assertSame($expected, (new Calculator($a, $b))->subtract());
  }

  public static function providerSubtract(): array {
    return [
      'positive' => [10, 5, 5],
      'negative' => [5, 10, -5],
    ];
  }

}
```

**Rules:**
- `#[Group('my_module')]` on every test class. Without it the test does not run in core's group-based CI runners.
- `#[CoversClass(MyClass::class)]` for coverage; `#[CoversMethod]` for a single method.
- `#[DataProvider('method')]` with a `public static` provider; prefer named data sets.
- Call `parent::setUp()` first in every `setUp()`.
- Prefer `assertSame()` over `assertEquals()`.

## Mocking

```php
// Mock a service
$config_factory = $this->createMock(ConfigFactoryInterface::class);
$config_factory->method('get')
  ->with('my_module.settings')
  ->willReturn($this->createMock(ImmutableConfig::class));

// Mock a Drupal entity
$user = $this->createMock(UserInterface::class);
$user->method('getDisplayName')->willReturn('Test User');
$user->method('hasPermission')
  ->with('administer content')
  ->willReturn(TRUE);

// Use the mock
$service = new MyService($config_factory);
```

`createMock()` is preferred. `getMockBuilder()` is only needed for partial mocks (`onlyMethods()`). Prophecy still works through `phpspec/prophecy-phpunit` but new tests should use PHPUnit's own mocks.

## Kernel Test

```php
declare(strict_types=1);

namespace Drupal\Tests\my_module\Kernel;

use Drupal\KernelTests\KernelTestBase;
use PHPUnit\Framework\Attributes\Group;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;

/**
 * Tests the queue worker processes items correctly.
 */
#[Group('my_module')]
#[RunTestsInSeparateProcesses]
final class TeamCleanerTest extends KernelTestBase {

  protected static $modules = ['my_module', 'system', 'user'];

  protected function setUp(): void {
    parent::setUp();
    $this->installSchema('my_module', ['my_module_teams']); // non-entity table
    $this->installEntitySchema('node');                      // entity table
    $this->installConfig(['my_module']);                     // module config
  }

  public function testQueueProcessing(): void {
    $database = $this->container->get('database');
    $database->insert('my_module_teams')->fields(['name' => 'Team A'])->execute();

    $worker = $this->container
      ->get('plugin.manager.queue_worker')
      ->createInstance('my_module_cleaner');

    $worker->processItem((object) ['id' => 1]);

    $count = $database->select('my_module_teams', 't')
      ->countQuery()
      ->execute()
      ->fetchField();
    $this->assertSame(0, (int) $count);
  }

}
```

**Available setup methods:**
- `installSchema('module', ['table'])` installs a non-entity DB table
- `installEntitySchema('entity_type')` installs entity storage tables
- `installConfig(['module'])` imports default config from `config/install/`
- `installModules(['module'])` installs additional modules

### Shared Environment (12.0+, Optional; Default in 13)

`#[ShareEnvironment]` builds the database once per test class instead of once per method. Schema and config installation move to `setUpEnvironment()`; per-method state stays in `setUp()`; `resetEnvironment()` undoes anything a method changed. Opt in for slow kernel tests whose methods do not depend on a pristine database:

```php
use Drupal\TestTools\Attribute\ShareEnvironment;

#[Group('my_module')]
#[RunTestsInSeparateProcesses]
#[ShareEnvironment]
final class MyKernelTest extends KernelTestBase {

  protected static $modules = ['node'];

  protected function setUpEnvironment(): void {
    parent::setUpEnvironment();
    $this->installEntitySchema('node');
    $this->installConfig(['node']);
  }

  protected function setUp(): void {
    parent::setUp();
    $this->nodeStorage = $this->container->get('entity_type.manager')->getStorage('node');
  }

  public function testNodeIsSaved(): void {
    $node = $this->nodeStorage->create(['type' => 'page', 'title' => 'Test']);
    $node->save();
    // Never assert absolute IDs or row counts in a shared environment.
    $this->assertNotNull($this->nodeStorage->load($node->id()));
  }

}
```

Rules for shared environments: methods must be order-independent, never assert absolute IDs, never drop tables you did not create, enable modules through `$modules` only, and do not call `$this->container->set()` outside `register()` / `setUp()`. Use `#[ShareEnvironment(FALSE)]` on a class or method that needs its own database. Drupal 13 plans to make sharing the default, so write new kernel tests to these rules now.

### Routes in Kernel Tests (11.5+)

A kernel test class can declare routes it needs with `#[Route]` attributes on the test class instead of shipping a helper module.

## Functional Test

```php
declare(strict_types=1);

namespace Drupal\Tests\my_module\Functional;

use Drupal\Tests\BrowserTestBase;
use PHPUnit\Framework\Attributes\Group;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;

/**
 * Tests the My Module admin pages.
 */
#[Group('my_module')]
#[RunTestsInSeparateProcesses]
final class AdminPageTest extends BrowserTestBase {

  protected static $modules = ['my_module'];

  protected $defaultTheme = 'stark';

  public function testSettingsPage(): void {
    // Anonymous access is denied.
    $this->drupalGet('/admin/config/system/my-module');
    $this->assertSession()->statusCodeEquals(403);

    $admin = $this->drupalCreateUser(['administer my module']);
    $this->drupalLogin($admin);

    $this->drupalGet('/admin/config/system/my-module');
    $this->assertSession()->statusCodeEquals(200);
    $this->assertSession()->pageTextContains('My Module Settings');

    $this->submitForm(['salutation' => 'Good morning'], 'Save configuration');
    $this->assertSession()->pageTextContains('The configuration options have been saved.');

    $this->assertSame('Good morning', $this->config('my_module.settings')->get('salutation'));
  }

  public function testContentPage(): void {
    $this->drupalGet('/my-page');
    $this->assertSession()->statusCodeEquals(200);
    $this->assertSession()->elementExists('css', '.my-module-content');
    $this->assertSession()->elementTextContains('css', 'h1', 'My Page');
  }

}
```

Functional tests install the `testing` profile, which has no content types, no page cache and no dynamic page cache (12.0). Create what you need: `$this->drupalCreateContentType(['type' => 'article'])` before `drupalCreateNode(['type' => 'article'])`. Do not rely on the Standard profile's Article/Page types; they were removed from Standard in 11.4 anyway.

### Common Assertions

```php
$this->assertSession()->statusCodeEquals(200);
$this->assertSession()->statusCodeEquals(403);
$this->assertSession()->statusCodeEquals(404);
$this->assertSession()->pageTextContains('expected text');
$this->assertSession()->pageTextNotContains('absent text');
$this->assertSession()->elementExists('css', '.my-class');
$this->assertSession()->elementTextContains('css', 'h1', 'Title');
$this->assertSession()->fieldExists('edit-salutation');
$this->assertSession()->fieldValueEquals('edit-salutation', 'Good morning');
$this->assertSession()->addressEquals('/admin/config');
$this->assertSession()->linkExists('Click here');
$this->assertSession()->responseContains('<strong>bold</strong>');
```

### Helpers

```php
$admin = $this->drupalCreateUser(['permission one', 'permission two']);
$this->drupalLogin($admin);
$this->drupalLogout();

$this->drupalCreateContentType(['type' => 'article', 'name' => 'Article']);
$node = $this->drupalCreateNode(['type' => 'article', 'title' => 'Test']);

// Follow a link
$this->clickLink('Edit');
$this->drupalGet('/node/1/edit');

// Submit a form
$this->submitForm(['edit-title-0-value' => 'New Title'], 'Save');
```

## FunctionalJavascript Test

```php
declare(strict_types=1);

namespace Drupal\Tests\my_module\FunctionalJavascript;

use Drupal\FunctionalJavascriptTests\WebDriverTestBase;
use PHPUnit\Framework\Attributes\Group;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;

/**
 * Tests AJAX form behavior.
 */
#[Group('my_module')]
#[RunTestsInSeparateProcesses]
final class AjaxFormTest extends WebDriverTestBase {

  protected static $modules = ['my_module'];
  protected $defaultTheme = 'stark';

  public function testAjaxFieldUpdate(): void {
    $admin = $this->drupalCreateUser(['administer my module']);
    $this->drupalLogin($admin);
    $this->drupalGet('/my-module/add');

    $page = $this->getSession()->getPage();

    // Select a value to trigger AJAX
    $page->selectFieldOption('edit-type', 'advanced');

    // Wait for AJAX response
    $this->assertSession()->assertWaitOnAjaxRequest();

    // Assert dynamic content appeared
    $this->assertSession()->elementExists('css', '#advanced-options');
    $this->assertSession()->fieldExists('edit-advanced-setting');

    // Test machine name auto-generation
    $page->fillField('edit-label', 'My Test Item');
    $this->assertJsCondition('document.querySelector(".machine-name-value").textContent === "my_test_item"');
  }

}
```

**FunctionalJavascript-specific methods:**
- `$this->assertSession()->assertWaitOnAjaxRequest()` waits for pending AJAX
- `$this->assertJsCondition('js expression')` waits until the JS expression is truthy
- `$page->attachFileToField('edit-file', '/absolute/path/to/file.csv')` uploads a file
- `$this->createScreenshot('/tmp/screenshot.png')` captures a screenshot for debugging

HTML5 client-side validation is disabled by default in Drupal 12, so a form with a `required` field submits to the server and the test sees Drupal's validation message, not a browser tooltip. Tests that passed on 11.x by relying on the browser blocking submission need updating.

## Skipping Tests (11.5+)

```php
use Drupal\TestTools\Attribute\Skip;

#[Skip('Blocked on https://www.drupal.org/i/1234567')]
public function testSomethingBroken(): void {}
```

Prefer this over `markTestSkipped()` inside the method body; the attribute is visible in listings and static analysis.

## Running Tests

```bash
# From Drupal root directory
cd /path/to/drupal

# Run all tests for a module
vendor/bin/phpunit modules/custom/my_module/tests

# Run a specific test class
vendor/bin/phpunit modules/custom/my_module/tests/src/Unit/CalculatorTest.php

# Run by group
vendor/bin/phpunit --group=my_module

# Run by filter (method name)
vendor/bin/phpunit --filter=testAdd

# Debug output
vendor/bin/phpunit --debug modules/custom/my_module/tests
```

Packaged Drupal 12 core releases no longer ship core's own test suites, so install `drupal/core-dev` (which provides PHPUnit, Mink and the test base classes' dependencies) as a dev dependency in every project that runs tests.

### Required Environment Variables

```bash
# For Kernel and Functional tests
export SIMPLETEST_DB='mysql://user:password@localhost/dbname'
export SIMPLETEST_BASE_URL='http://localhost'
export BROWSERTEST_OUTPUT_DIRECTORY='/tmp/browser-tests'

# For FunctionalJavascript (with ChromeDriver)
export MINK_DRIVER_ARGS_WEBDRIVER='["chrome", {"browserName": "chrome", "goog:chromeOptions": {"args": ["--headless"]}}, "http://localhost:4444"]'
```

### phpunit.xml Setup

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit bootstrap="core/tests/bootstrap.php"
         failOnDeprecation="false"
         displayDetailsOnTestsThatTriggerDeprecations="true">
  <php>
    <env name="SIMPLETEST_DB" value="mysql://drupal:drupal@127.0.0.1/drupal"/>
    <env name="SIMPLETEST_BASE_URL" value="http://localhost"/>
    <env name="BROWSERTEST_OUTPUT_DIRECTORY" value="/tmp/phpunit-browser-output"/>
  </php>
  <extensions>
    <!-- Replaces SYMFONY_DEPRECATIONS_HELPER (deprecated in 11.5). -->
    <bootstrap class="Drupal\TestTools\Extension\DeprecationBridge\DeprecationHandler">
      <parameter name="enableProjectIgnores" value="true"/>
      <parameter name="projectIgnoreFile" value=".deprecation-ignore.txt"/>
      <parameter name="enableDebugClassLoader" value="true"/>
    </bootstrap>
  </extensions>
  <testsuites>
    <testsuite name="unit">
      <directory>modules/custom/*/tests/src/Unit</directory>
    </testsuite>
    <testsuite name="kernel">
      <directory>modules/custom/*/tests/src/Kernel</directory>
    </testsuite>
    <testsuite name="functional">
      <directory>modules/custom/*/tests/src/Functional</directory>
    </testsuite>
  </testsuites>
</phpunit>
```

Override the handler per run with `DRUPAL_DEPRECATION_FILTER_CONFIG='{"enableDebugClassLoader":false}'`. Fail CI on deprecations from your own code; ignore third-party ones through the ignore file, never by disabling the handler.

## Test Helper Modules

For tests that need specific content types, fields, or configuration, create a minimal helper module in `tests/modules/`:

```
tests/modules/my_module_test/
├── my_module_test.info.yml
├── config/install/    # Test-specific configuration
└── src/               # Test-specific classes (hooks go in src/Hook/, same as any module)
```

Reference in test:

```php
protected static $modules = ['my_module', 'my_module_test'];
```

Test helper modules follow the same rules as real modules: no `.module` file, hooks in `src/Hook/`.
