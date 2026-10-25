# CMS and Framework-Specific Commands

Each DDEV project type enables CLI shortcuts specific to that CMS or framework. The project type is set in `.ddev/config.yaml` under the `type` key.

## Drupal (`type: drupal`)

Drush is the primary CLI tool for Drupal.

```bash
# Cache operations
ddev drush cr                         # Cache rebuild
ddev drush cc render                  # Clear render cache only

# Database updates
ddev drush updb -y                    # Run pending update hooks
ddev drush cim -y                     # Import configuration
ddev drush cex -y                     # Export configuration

# Module/theme management
ddev drush en module_name -y          # Enable a module
ddev drush pmu module_name -y         # Uninstall a module
ddev drush theme:enable theme_name    # Enable a theme

# User management
ddev drush uli                        # Generate one-time login link
ddev drush user:password admin "pw"   # Set user password

# Status and info
ddev drush status                     # Site status report
ddev drush pml                        # List all modules and status
ddev drush ws                         # Show recent watchdog entries

# Running Drupal scripts
ddev drush php:eval "echo phpversion();"
ddev drush php:script path/to/script.php
```

Note: Drush must be installed as a project dependency (`ddev composer require drush/drush`). DDEV does not bundle Drush.

## Laravel (`type: laravel`)

Artisan is Laravel's CLI tool.

```bash
# Artisan commands (alias: ddev art)
ddev artisan migrate                  # Run migrations
ddev artisan migrate:rollback         # Rollback last migration
ddev artisan make:model Post -m       # Generate model with migration
ddev artisan make:controller PostController
ddev artisan tinker                   # Interactive REPL
ddev artisan route:list               # List all routes
ddev artisan cache:clear              # Clear application cache
ddev artisan config:clear             # Clear config cache
ddev artisan queue:work               # Process queue jobs
ddev artisan schedule:run             # Run scheduled tasks
ddev artisan test                     # Run tests
ddev artisan key:generate             # Generate app key

# Running Laravel with npm
ddev npm run dev                      # Vite dev server
ddev npm run build                    # Production build
```

## WordPress (`type: wordpress`)

WP-CLI is the command-line interface for WordPress.

```bash
# Core operations
ddev wp core version                  # Show WordPress version
ddev wp core update                   # Update WordPress
ddev wp core verify-checksums         # Verify core file integrity

# Plugin management
ddev wp plugin list                   # List plugins
ddev wp plugin install woocommerce    # Install a plugin
ddev wp plugin activate woocommerce   # Activate a plugin
ddev wp plugin update --all           # Update all plugins

# Theme management
ddev wp theme list                    # List themes
ddev wp theme activate theme-name     # Activate a theme

# User management
ddev wp user list                     # List users
ddev wp user create bob bob@example.com --role=editor

# Database operations
ddev wp db export                     # Export database
ddev wp search-replace 'old-url' 'new-url'  # Search and replace in DB

# Content
ddev wp post list                     # List posts
ddev wp option get siteurl            # Get a WordPress option
```

## Magento 2 (`type: magento2`)

```bash
ddev magento setup:upgrade            # Run setup/upgrade
ddev magento setup:di:compile         # Compile DI
ddev magento setup:static-content:deploy  # Deploy static content
ddev magento cache:clean              # Clean cache
ddev magento cache:flush              # Flush cache storage
ddev magento indexer:reindex          # Reindex all indexers
ddev magento module:status            # List module status
```

## Symfony (`type: symfony`)

```bash
ddev console list                     # List available commands
ddev console debug:router             # Show all routes
ddev console make:controller          # Generate controller
ddev console make:entity              # Generate entity
ddev console doctrine:migrations:migrate  # Run migrations
ddev console cache:clear              # Clear cache
```

## TYPO3 (`type: typo3`)

```bash
ddev typo3 cache:flush                # Flush all caches
ddev typo3 extension:list             # List extensions
ddev typo3 database:updateschema      # Update database schema
ddev typo3 site:list                  # List sites
```

## Craft CMS (`type: craftcms`)

```bash
ddev craft install                    # Run the installer
ddev craft clear-caches/all           # Clear all caches
ddev craft migrate/all                # Run all migrations
ddev craft project-config/apply       # Apply project config
```

## CakePHP (`type: cakephp`)

```bash
ddev cake migrations migrate          # Run migrations
ddev cake bake model Posts            # Generate model
ddev cake cache clear_all             # Clear all caches
```

## Silverstripe (`type: silverstripe`)

```bash
ddev sake dev/build                   # Build/rebuild database
ddev sake dev/tasks                   # List available tasks
```

## CodeIgniter (`type: codeigniter`)

```bash
ddev spark serve                      # Start dev server (rarely needed with DDEV)
ddev spark migrate                    # Run migrations
ddev spark make:controller Home       # Generate controller
```

## Backdrop (`type: backdrop`)

```bash
# Uses Drush, same as Drupal
ddev drush cc all                     # Clear all caches
ddev drush updb                       # Run database updates
ddev drush uli                        # Generate login link
```

## Running arbitrary commands

For any tool not covered by a wrapper:

```bash
# Run any command inside the web container
ddev exec vendor/bin/phpunit
ddev exec vendor/bin/phpstan analyse
ddev exec vendor/bin/php-cs-fixer fix
ddev exec ./vendor/bin/pest

# Interactive shell
ddev ssh
```
