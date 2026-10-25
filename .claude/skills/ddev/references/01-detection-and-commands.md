# Detection and Command Routing

## Detecting DDEV

A project uses DDEV if a `.ddev/` directory exists in the project root. Inside it:

- `.ddev/config.yaml` — primary configuration (project type, PHP version, database, etc.)
- `.ddev/config.*.yaml` — override files (e.g., `config.local.yaml` for personal overrides, `config.elasticsearch.yaml` for add-on config)
- `.ddev/docker-compose.*.yaml` — custom Docker service definitions
- `.ddev/.env.*` — environment variable files for add-ons and services

## Why commands must go through DDEV

DDEV runs your project inside Docker containers with the correct:
- PHP version and extensions
- Node.js version
- Composer version
- Database client tools
- CMS-specific CLI tools (Drush, WP-CLI, Artisan, etc.)

Running commands on the host bypasses all of this. A host `composer install` will use the host PHP version (which may be wrong), miss required extensions, and fail to connect to the containerized database.

## Complete command routing table

### Commands that MUST run through DDEV

**Package managers:**

| Host command | DDEV equivalent | Notes |
|---|---|---|
| `composer *` | `ddev composer *` | Uses container PHP version and extensions. Alias: `ddev co` |
| `composer create-project *` | `ddev composer create-project *` | Special DDEV adaptation for project creation |
| `npm *` | `ddev npm *` | Uses container Node.js version |
| `npx *` | `ddev npx *` | |
| `yarn *` | `ddev yarn *` | Requires `corepack_enable: true` in config.yaml |
| `pnpm *` | `ddev pnpm *` | Requires `corepack_enable: true` or `ddev/ddev-pnpm` add-on |

**Runtime commands:**

| Host command | DDEV equivalent | Notes |
|---|---|---|
| `php *` | `ddev php *` | Runs PHP with the configured version |
| `node *` | `ddev exec node *` | No direct wrapper; use `ddev exec` |
| `mysql` | `ddev mysql` | Connects to the project database |
| `psql` | `ddev psql` | Connects to the project PostgreSQL database |
| `sqlite3` | `ddev exec sqlite3` | |

**CMS/Framework CLI tools:**

| Host command | DDEV equivalent | Available when `type` is |
|---|---|---|
| `drush *` | `ddev drush *` | `drupal`, `backdrop` |
| `php artisan *` | `ddev artisan *` | `laravel` (alias: `ddev art`) |
| `wp *` | `ddev wp *` | `wordpress` |
| `bin/magento *` | `ddev magento *` | `magento2` |
| `bin/console *` | `ddev console *` | `symfony` |
| `php craft *` | `ddev craft *` | `craftcms` |
| `bin/cake *` | `ddev cake *` | `cakephp` |
| `vendor/bin/typo3 *` | `ddev typo3 *` | `typo3` |
| `vendor/bin/sake *` | `ddev sake *` | `silverstripe` |
| `php spark *` | `ddev spark *` | `codeigniter` |

**Arbitrary commands inside the container:**

```bash
# Run any command in the web container
ddev exec <command>

# Interactive shell inside the container
ddev ssh
```

### Commands that run on the HOST (not through DDEV)

These commands operate on the host filesystem or host-level tooling and should NOT be prefixed with `ddev`:

- `git *` — all git operations
- `ddev *` — DDEV management commands themselves (start, stop, config, etc.)
- IDE/editor commands
- File system operations (ls, cp, mv, mkdir, etc.)
- SSH to remote servers
- Cloud CLI tools (gcloud, aws, az, etc.) — unless the tool specifically needs to run inside the container

## Project lifecycle commands

```bash
ddev start          # Start the project containers
ddev stop           # Stop containers (preserves database)
ddev restart        # Restart all services
ddev poweroff       # Stop all DDEV projects and resources
ddev delete         # Destroy database and project registration (destructive!)
ddev describe       # Show project info, URLs, ports
ddev status         # Quick status check
ddev list           # List all DDEV projects
ddev launch         # Open project URL in browser
ddev logs           # Web server logs
ddev logs -s db     # Database server logs
```

## Checking DDEV status before running commands

Before running any `ddev composer`, `ddev npm`, etc., ensure the project is running:

```bash
# Check if running
ddev status

# Start if needed
ddev start
```

If a command fails with a connection error or "not running" message, `ddev start` is almost always the fix.
