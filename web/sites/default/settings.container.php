<?php

/**
 * @file
 * Settings for the container image, read from the environment.
 *
 * Included from settings.php when DRUPAL_ENVIRONMENT is set. Every variable
 * read here is declared in docker-compose.yml and documented in .env.example.
 * Each block is guarded on its primary variable, and getenv() returns '' for a
 * set-but-empty one, so an empty value is treated as absent.
 */

use Drupal\Core\Installer\InstallerKernel;

if (getenv('DB_HOST')) {
  $databases['default']['default'] = [
    'driver' => 'mysql',
    'database' => getenv('DB_NAME'),
    'username' => getenv('DB_USER'),
    'password' => getenv('DB_PASSWORD'),
    'host' => getenv('DB_HOST'),
    'port' => getenv('DB_PORT') ?: '3306',
  ];
}

// Carried over from Platform.sh's project entropy, so sessions and one-time
// login links survive the move. Never generate a new one per deploy.
if (getenv('HASH_SALT')) {
  $settings['hash_salt'] = getenv('HASH_SALT');
}

// Set at build time to the commit the image was built from.
if (getenv('APP_RELEASE')) {
  $settings['deployment_identifier'] = getenv('APP_RELEASE');
}

// The image layout: /app/private and /tmp, see the Dockerfile.
$settings['file_private_path'] = dirname($app_root) . '/private';
$settings['file_temp_path'] = '/tmp';

// A comma-separated list of full regular expressions, used as given.
if (getenv('TRUSTED_HOST_PATTERNS')) {
  $settings['trusted_host_patterns'] = array_map('trim', explode(',', getenv('TRUSTED_HOST_PATTERNS')));
}

// The container is reachable only through Coolify's proxy, which is why
// docker-compose.yml publishes no ports.
if (!empty($_SERVER['REMOTE_ADDR'])) {
  $settings['reverse_proxy'] = TRUE;
  $settings['reverse_proxy_addresses'] = [$_SERVER['REMOTE_ADDR']];
}

if (getenv('DRUPAL_ENVIRONMENT') === 'production') {
  $config['system.logging']['error_level'] = 'hide';
}

if (getenv('SLACK_WEBHOOK_URL')) {
  $config['slack.settings']['slack_webhook_url'] = getenv('SLACK_WEBHOOK_URL');
}

if (getenv('REDIS_HOST') && !InstallerKernel::installationAttempted() && extension_loaded('redis') && class_exists('Drupal\redis\ClientFactory')) {
  // Set Redis as the default backend for any cache bin not otherwise specified.
  $settings['cache']['default'] = 'cache.backend.redis';
  $settings['redis.connection']['host'] = getenv('REDIS_HOST');
  $settings['redis.connection']['port'] = getenv('REDIS_PORT') ?: 6379;

  // Use Redis for the lock and flood control systems and the cache tag
  // checksum too, and allow the services to work before the module is enabled.
  $settings['container_yamls'][] = 'modules/contrib/redis/example.services.yml';
  $settings['container_yamls'][] = 'modules/contrib/redis/redis.services.yml';

  // The container cache definition below needs the classes before the module
  // is enabled.
  $class_loader->addPsr4('Drupal\\redis\\', 'modules/contrib/redis/src');

  // Use Redis for the container cache, which is loaded before any
  // configuration is available.
  $settings['bootstrap_container_definition'] = [
    'parameters' => [],
    'services' => [
      'redis.factory' => [
        'class' => 'Drupal\redis\ClientFactory',
      ],
      'cache.backend.redis' => [
        'class' => 'Drupal\redis\Cache\CacheBackendFactory',
        'arguments' => ['@redis.factory', '@cache_tags_provider.container', '@serialization.phpserialize'],
      ],
      'cache.container' => [
        'class' => '\Drupal\redis\Cache\PhpRedis',
        'factory' => ['@cache.backend.redis', 'get'],
        'arguments' => ['container'],
      ],
      'cache_tags_provider.container' => [
        'class' => 'Drupal\redis\Cache\RedisCacheTagsChecksum',
        'arguments' => ['@redis.factory'],
      ],
      'serialization.phpserialize' => [
        'class' => 'Drupal\Component\Serialization\PhpSerialize',
      ],
    ],
  ];
}
