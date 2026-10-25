# Services and Dependency Injection

## Defining a Service

In `my_module.services.yml`:

```yaml
services:
  my_module.salutation:
    class: Drupal\my_module\MyModuleSalutation
    arguments: ['@config.factory']

  my_module.access_checker:
    class: Drupal\my_module\Access\MyAccessChecker
    arguments: ['@config.factory', '@current_user']
    tags:
      - { name: access_check, applies_to: _my_access_check }

  my_module.event_subscriber:
    class: Drupal\my_module\EventSubscriber\MySubscriber
    arguments: ['@current_route_match', '@current_user']
    tags:
      - { name: event_subscriber }

  my_module.logger.channel.my_module:
    parent: logger.channel_base
    arguments: ['my_module']

  my_module.mail_logger:
    class: Drupal\my_module\Logger\MailLogger
    tags:
      - { name: logger }

  cache.my_bin:
    class: Drupal\Core\Cache\CacheBackendInterface
    tags:
      - { name: cache.bin }
    factory: cache_factory:get
    arguments: [my_bin]

  my_module.config_override:
    class: Drupal\my_module\Config\MyConfigOverride
    tags:
      - { name: config.factory.override, priority: 5 }
```

## Dependency Injection Patterns

### In Controllers (extends ControllerBase)

```php
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class MyController extends ControllerBase {

  // Constructor property promotion with readonly — the standard
  public function __construct(
    protected readonly MyService $myService,
    protected readonly ConfigFactoryInterface $configFactory,
  ) {}

  public static function create(ContainerInterface $container): static {
    return new static(
      $container->get('my_module.salutation'),
      $container->get('config.factory'),
    );
  }
}
```

### In Forms (extends FormBase or ConfigFormBase)

Same `create(ContainerInterface $container)` pattern as controllers.

### In Plugins (implements ContainerFactoryPluginInterface)

```php
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;

class MyBlock extends BlockBase implements ContainerFactoryPluginInterface {
  public function __construct(
    array $configuration,
    string $plugin_id,
    mixed $plugin_definition,
    protected readonly MyService $myService,
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  public static function create(
    ContainerInterface $container,
    array $configuration,
    string $plugin_id,
    mixed $plugin_definition,
  ): static {
    return new static(
      $configuration, $plugin_id, $plugin_definition,
      $container->get('my_module.salutation'),
    );
  }
}
```

### In Entity Handlers (implements EntityHandlerInterface)

```php
public static function createInstance(
  ContainerInterface $container,
  EntityTypeInterface $entity_type,
): static {
  return new static(
    $entity_type,
    $container->get('entity_type.manager'),
  );
}
```

### In Services (constructor injection)

```php
class MyModuleSalutation {
  public function __construct(
    protected readonly ConfigFactoryInterface $configFactory,
    protected readonly LoggerChannelInterface $logger,
  ) {}
}
```

### Autowiring

Hook classes (`src/Hook/`) and `dr` commands (`src/Command/`) are discovered and autowired with no `services.yml` entry. Any other service can opt in with `autowire: true`; then constructor parameters are resolved by interface. Use `#[Autowire]` when the interface alone is ambiguous:

```yaml
services:
  Drupal\my_module\MyModuleSalutation:
    autowire: true
```

```php
use Symfony\Component\DependencyInjection\Attribute\Autowire;

public function __construct(
  private readonly ConfigFactoryInterface $configFactory,            // resolved by interface alias
  #[Autowire(service: 'logger.channel.my_module')]
  private readonly LoggerInterface $logger,                           // explicit service ID
  #[Autowire(service: 'cache.my_bin')]
  private readonly CacheBackendInterface $cache,                      // named cache bin
) {}
```

Prefer explicit `arguments:` for services that other modules may decorate or override; autowiring is fine for internal services and everything in `src/Hook/`.

## Static Service Access — When to Use

Use `\Drupal::` static calls **only** in:
- `hook_schema()`, `hook_install()`, `hook_update_N()`, `hook_post_update_NAME()` in `.install` / `.post_update.php` (no container-managed instance exists for these)
- `InstallRequirementsInterface::getRequirements()` (runs before the full API is available)
- Class static methods where DI is impossible (`FieldItemBase::schema()`, batch callbacks, lazy builder trusted callbacks)
- Theme helper classes (themes cannot define services)

**Never use `\Drupal::` inside:**
- Hook classes in `src/Hook/` (they are autowired; inject what you need)
- Service class constructors or methods
- Controller methods (use injected services)
- Form methods (use injected services)
- Plugin class methods (use injected services)

There are no procedural hook functions in new code, so "it's a `.module` file" is no longer a reason for a static call.

```php
// BAD — in a service class
class MyService {
  public function doSomething(): void {
    $config = \Drupal::config('my_module.settings'); // DO NOT
    $user = \Drupal::currentUser();                  // DO NOT
  }
}

// GOOD — injected
class MyService {
  public function __construct(
    protected readonly ConfigFactoryInterface $configFactory,
    protected readonly AccountProxyInterface $currentUser,
  ) {}

  public function doSomething(): void {
    $config = $this->configFactory->get('my_module.settings');
    $user = $this->currentUser;
  }
}
```

## Common Core Services

| Service ID | Interface / Class | Purpose |
|---|---|---|
| `config.factory` | `ConfigFactoryInterface` | Read/write simple config |
| `entity_type.manager` | `EntityTypeManagerInterface` | Load entity storage, view builders |
| `current_user` | `AccountProxyInterface` | Current user account |
| `current_route_match` | `RouteMatchInterface` | Current route name and parameters |
| `event_dispatcher` | `EventDispatcherInterface` | Dispatch and subscribe to events |
| `logger.factory` | `LoggerChannelFactoryInterface` | Get a logger channel |
| `module_handler` | `ModuleHandlerInterface` | Check if module is installed, invoke hooks |
| `path_alias.manager` | `AliasManagerInterface` | Resolve path aliases |
| `path.matcher` | `PathMatcherInterface` | Check if path matches pattern |
| `renderer` | `RendererInterface` | Render render arrays to HTML |
| `string_translation` | `TranslationInterface` | Translate strings |
| `tempstore.private` | `PrivateTempStoreFactory` | Per-user session storage |
| `tempstore.shared` | `SharedTempStoreFactory` | Cross-user temporary storage |
| `token` | `Token` | Evaluate token strings |
| `database` | `Connection` | Database queries |
| `cache.default` | `CacheBackendInterface` | Default cache bin |
| `cache.memory` | `MemoryCacheInterface` | Per-request memory cache (replaces `drupal_static()`) |
| `lock` | `LockBackendInterface` | Distributed locking |
| `state` | `StateInterface` | Runtime state storage |
| `queue` | `QueueFactory` | Queue management |
| `user.data` | `UserDataInterface` | Per-user data storage |
| `csrf_token` | `CsrfTokenGenerator` | CSRF token generation/validation |
| `access_manager` | `AccessManagerInterface` | Programmatic access checks |
| `file_system` | `FileSystemInterface` | File operations |
| `http_client` | `Client` (Guzzle) | HTTP requests |
| `messenger` | `MessengerInterface` | Status/error/warning messages |

## Tagged Services

Tags tell Drupal to automatically collect services for specific purposes:

| Tag | Purpose |
|---|---|
| `event_subscriber` | Registers as a Symfony event subscriber |
| `logger` | Registers as a logger (receives all log calls) |
| `access_check` + `applies_to` | Service-based route access checker |
| `cache.bin` | Defines a new cache bin |
| `config.factory.override` + `priority` | Overrides config values |
| `theme_negotiator` | Theme negotiation |
| `stream_wrapper` + `scheme` | Defines a file stream wrapper scheme |
| `page_cache_request_policy` | Custom page cache policy |
| `page_cache_response_policy` | Custom page cache response policy |
| `twig.extension` | Adds Twig functions/filters |

## Per-Request Memoisation Without `drupal_static()`

`drupal_static()` and `drupal_static_reset()` are deprecated in 11.5. Keep per-request results on the service itself, or use the `memory` cache bin when the value must be shared across services or reset from elsewhere:

```php
public function __construct(
  #[Autowire(service: 'cache.memory')]
  private readonly MemoryCacheInterface $memoryCache,
) {}

public function lookup(string $key): array {
  if ($cached = $this->memoryCache->get("my_module:lookup:$key")) {
    return $cached->data;
  }
  $data = $this->expensiveLookup($key);
  $this->memoryCache->set("my_module:lookup:$key", $data);
  return $data;
}
// Reset: $this->memoryCache->delete("my_module:lookup:$key");
```

## Exception: FieldType Plugins

`FieldItemBase` subclasses (FieldType plugins) cannot use constructor injection — they extend TypedData which has a different instantiation path. Use static `\Drupal::` calls inside them:

```php
// In a FieldType plugin — static calls are acceptable here
public function getConstraints(): array {
  $manager = \Drupal::service('validation.constraint');
  return $manager->create('Regex', ['pattern' => '/^\d{4}$/']);
}
```
