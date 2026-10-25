# Debugging and Development Tools

## Xdebug

DDEV includes Xdebug but it is disabled by default for performance.

```bash
# Enable Xdebug
ddev xdebug on

# Disable Xdebug
ddev xdebug off

# Toggle Xdebug
ddev xdebug toggle

# Check Xdebug status
ddev xdebug status
```

When Xdebug is enabled, configure your IDE to listen for debug connections on port 9003. DDEV automatically configures the container to connect back to your IDE.

To enable Xdebug by default (slower startup):

```yaml
# .ddev/config.yaml
xdebug_enabled: true
```

## Xhprof profiling

```bash
ddev xhprof on      # Enable xhprof profiling
ddev xhprof off     # Disable xhprof profiling
```

## XHGui

XHGui provides a web interface for viewing xhprof profiling data:

```bash
ddev xhgui on       # Enable XHGui
ddev xhgui off      # Disable XHGui
```

## Blackfire profiling

```bash
ddev blackfire on    # Enable Blackfire
ddev blackfire off   # Disable Blackfire
```

Requires Blackfire credentials in `.ddev/config.yaml` or environment variables.

## Mailpit (email capture)

DDEV includes Mailpit, which captures all outgoing email from the application. No email is ever sent to real recipients.

```bash
# Open Mailpit in browser
ddev mailpit

# Or access directly at:
# https://<projectname>.ddev.site:8026
```

All PHP `mail()` calls and SMTP connections from the container are automatically routed to Mailpit.

## Sharing your project

Expose your local DDEV project to the internet (useful for mobile testing, client demos, webhook testing):

```bash
# Share via ngrok (requires ngrok account)
ddev share
```

## SSH agent forwarding

If your project needs SSH keys (e.g., for private Composer repositories):

```bash
# Add your SSH keys to the DDEV SSH agent
ddev auth ssh
```

This makes your host SSH keys available inside the container.

## Logs

```bash
# Web server logs (nginx/apache)
ddev logs

# Follow logs in real-time
ddev logs -f

# Database logs
ddev logs -s db

# Follow database logs
ddev logs -s db -f
```

## File imports

Import uploaded files / media assets:

```bash
# Import a directory of files
ddev import-files --source=path/to/files

# Import from archive
ddev import-files --source=files.tar.gz
```

The target directory is determined by the project type (e.g., `sites/default/files` for Drupal, `wp-content/uploads` for WordPress).

## Custom web daemons

Run additional long-running processes in the web container:

```yaml
# .ddev/config.yaml
web_extra_daemons:
  - name: queue-worker
    command: php artisan queue:work --tries=3
    directory: /var/www/html
  - name: vite
    command: npm run dev
    directory: /var/www/html
```

## Pre-installed tools in the web container

The DDEV web container includes many tools out of the box:

- **PHP tools:** composer, php, phpunit (if in vendor/bin)
- **Node.js tools:** node, npm, npx, yarn (if corepack enabled), nvm
- **Database clients:** mysql, psql, sqlite3
- **General tools:** git, curl, wget, vim, nano, zip, unzip, rsync, ssh, jq
- **CMS CLI tools:** drush, wp-cli, n98-magerun2 (depending on project type)

Additional tools can be installed via `webimage_extra_packages` in config.yaml or by creating a custom `.ddev/web-build/Dockerfile`:

```dockerfile
# .ddev/web-build/Dockerfile
RUN apt-get update && apt-get install -y some-package
```
