# DDEV Configuration

## Configuration file: `.ddev/config.yaml`

This is the primary configuration file for a DDEV project. It is version-controlled and shared across the team.

### Key options

| Option | Description | Default |
|---|---|---|
| `name` | URL-friendly project name | enclosing directory name |
| `type` | Project type — determines CMS CLI availability | auto-detected |
| `docroot` | Relative path to the web document root | auto-detected |
| `php_version` | PHP version (8.1, 8.2, 8.3, 8.4, 8.5, etc.) | varies by type |
| `nodejs_version` | Node.js version (18, 20, 22, etc.) | 22 |
| `database` | Database type:version | `mariadb:11.8` |
| `composer_version` | Composer version (1, 2, 2.2, etc.) | 2 (latest) |
| `composer_root` | Relative path to directory containing composer.json | project root |
| `webserver_type` | `nginx-fpm` or `apache-fpm` | `nginx-fpm` |
| `corepack_enable` | Enable Corepack for Yarn/pnpm | `false` |
| `performance_mode` | `mutagen`, `nfs`, or empty | platform default |
| `disable_settings_management` | Prevent DDEV from managing CMS settings files | `false` |
| `xdebug_enabled` | Start with Xdebug on | `false` |
| `fail_on_hook_fail` | Abort `ddev start` if a hook fails | `false` |
| `host_db_port` | Fixed port for database access from host | auto-assigned |
| `ddev_version_constraint` | Minimum DDEV version (e.g., `>=1.24.0`) | none |

### Supported project types

`backdrop`, `cakephp`, `codeigniter`, `craftcms`, `django4`, `drupal`, `generic`, `laravel`, `magento`, `magento2`, `php`, `python`, `shopware6`, `silverstripe`, `symfony`, `typo3`, `wordpress`

### Supported databases

**MariaDB:** 5.5, 10.0, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.11, 11.4, 11.8
**MySQL:** 5.5, 5.6, 5.7, 8.0, 8.4
**PostgreSQL:** 9, 10, 11, 12, 13, 14, 15, 16, 17, 18

### Example config.yaml

```yaml
name: my-project
type: drupal
docroot: web
php_version: "8.3"
nodejs_version: "22"
database:
  type: mariadb
  version: "11.8"
webserver_type: nginx-fpm
corepack_enable: false
xdebug_enabled: false
```

## Override files: `config.*.yaml`

Files matching `config.*.yaml` are merged on top of `config.yaml` in alphabetical order. Common uses:

- **`config.local.yaml`** — personal overrides, gitignored by default. Use for `host_db_port`, `xdebug_enabled`, or `performance_mode` that differ per developer.
- **`config.elasticsearch.yaml`** — added by the Elasticsearch add-on to define the service.
- **`config.redis.yaml`** — added by the Redis add-on.

Any setting in `config.yaml` can be overridden in a `config.*.yaml` file.

## Configuring via CLI

```bash
# Set PHP version
ddev config --php-version=8.4

# Set project type
ddev config --project-type=laravel

# Set database
ddev config --database=postgres:16

# Set docroot
ddev config --docroot=public

# Set Node.js version
ddev config --nodejs-version=22

# Enable corepack (for yarn/pnpm)
ddev config --corepack-enable

# After config changes, restart:
ddev restart
```

## Environment variables

Set environment variables for the web container in `config.yaml`:

```yaml
web_environment:
  - APP_ENV=local
  - APP_DEBUG=true
  - SOME_API_KEY=abc123
```

Or use `.ddev/.env` files (`.ddev/.env`, `.ddev/.env.local`, etc.) which follow the dotenv convention.

## Extra packages

Install additional OS packages in the web or database container:

```yaml
webimage_extra_packages:
  - imagemagick
  - libicu-dev

dbimage_extra_packages:
  - some-package
```

## Hooks

Run commands at lifecycle events:

```yaml
hooks:
  post-start:
    - exec: composer install
    - exec: npm install
  post-import-db:
    - exec: drush cr
    - exec: drush updb -y
```

Hook types: `pre-start`, `post-start`, `pre-stop`, `post-stop`, `pre-import-db`, `post-import-db`, `pre-import-files`, `post-import-files`, `pre-composer`, `post-composer`, `pre-exec`, `post-exec`.

## Custom commands

Place shell scripts in `.ddev/commands/web/` or `.ddev/commands/host/` to create custom `ddev <command-name>` commands:

```bash
# .ddev/commands/web/setup
#!/bin/bash
## Description: Run project setup tasks
composer install
npm install
npm run build
```

Then run: `ddev setup`

## Global configuration

Global settings that apply to all DDEV projects are in `~/.ddev/global_config.yaml`. Modify with:

```bash
ddev config global --web-environment="EDITOR=vim"
ddev config global --performance-mode=mutagen
```
