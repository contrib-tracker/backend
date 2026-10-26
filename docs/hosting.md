# Hosting on Coolify

The site is moving from Upsun (Platform.sh) to a self-hosted [Coolify](https://coolify.io/) 4.5. Until the cutover both run: Upsun stays production, and its configuration stays in place.

## How it fits together

- **Image.** CI builds the `Dockerfile` on every run and, on `main`, pushes it to `ghcr.io/contrib-tracker/backend` as `latest` and `sha-<commit>`. It is based on [`hussainweb/drupal-base`](https://github.com/hussainweb/docker-drupal-base) (FrankenPHP), runs `composer install --no-dev` and installs the ct theme's runtime dependencies. `docker/Caddyfile` is the base image's Caddyfile with a few project rules added; keep the rest of it in step with the base image.
- **Stack.** `docker-compose.yml` runs the image as `web`, with MariaDB 12.3 (`mariadb`) and Valkey 8 as the Redis cache (`valkey`). Coolify deploys it as a Docker Compose resource.
- **Deploy.** After the tests pass on `main`, the `deploy_coolify` job calls Coolify's deploy webhook through the `production` GitHub environment. Coolify pulls the new `latest` and replaces the containers.
- **Settings.** `settings.container.php` reads everything from environment variables when `DRUPAL_ENVIRONMENT` is set. `.env.example` lists every variable.

## Setting up the Coolify resource

Do these once, in Coolify, on the server that will run the site.

1. **Resource.** New resource → Docker Compose, from this repository, branch `main`, compose file `/docker-compose.yml`. Turn **off** automatic deployment on push: CI deploys after the tests, and Coolify's own webhook would deploy untested code a second time.
2. **Image access.** The repository is public, so the package should be too. Check that after the first push from `main` (the package's settings on GitHub). If it is private, add a GHCR login with a `read:packages` token under the server's **Registries** tab and run its check.
3. **Variables.** Set them in the resource's environment variables; `.env.example` explains each.
   - `HASH_SALT`: the Upsun project entropy (`PLATFORM_PROJECT_ENTROPY`), not a new value, so sessions and one-time links keep working.
   - `DB_PASSWORD`, `DB_ROOT_PASSWORD`: new random values.
   - `TRUSTED_HOST_PATTERNS`: for example `^contrib\.axelerant\.com$`, plus the Coolify test domain while it is in use. The health check sends the domain as its `Host`, so a pattern that does not match it keeps the container unhealthy.
   - `DRUSH_OPTIONS_URI`, `SENTRY_DSN`, `SLACK_WEBHOOK_URL`: from the Upsun environment's variables.
   - Any other `drupalconfig:` or `drupalsettings:` variable on Upsun needs an equivalent before cutover; `settings.container.php` maps only the ones above.
4. **Domain.** Give the `web` service its domain, on port 80. Without a domain Coolify writes no proxy labels and the site answers `503 no available server`.
5. **Post-deployment command.** `drush -y deploy`, in the `web` container.
6. **Cron.** A scheduled task running `drush core:cron` in the `web` container every 20 minutes (`*/20 * * * *`). This drives contribution tracking: without it new contributions silently stop arriving. Add it only to the production resource, so that other copies do not query drupal.org and GitHub.
7. **Backups.** Scheduled backups of the `drupal-files`, `drupal-private` and `mariadb-data` volumes to S3, with retention. `drupal-files` holds the only data that cannot be regenerated besides the database.
8. **Deploy secrets.** On the GitHub `production` environment, set `COOLIFY_WEBHOOK_URL` (the resource's Webhooks tab) and `COOLIFY_API_TOKEN` (Keys & Tokens, with the `deploy` permission). The `deploy_coolify` job fails until both are set.

## Rolling back

Set `IMAGE_TAG` to `sha-<short commit>` of a previous build and redeploy; nothing is rebuilt. CI keeps the last five builds. Set it back to `latest` afterwards, or later deploys keep running the old image.

## Running the stack locally

DDEV remains the development environment. To try the production image itself, copy `.env.example` to an env file outside the repository, fill in the blanks, and run `docker compose --env-file <file> up -d`. The compose file publishes no ports, so test from inside the container, for example `docker compose exec web curl -H 'Host: localhost' http://127.0.0.1/`. Do not leave a `.env` in the project root: `load.environment.php` reads it into PHP under DDEV too.
