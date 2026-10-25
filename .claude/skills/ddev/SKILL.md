---
name: ddev
description: Guide command execution in DDEV-based projects. Use this skill whenever a project has a .ddev/ directory, when commands like composer, npm, drush, artisan, or wp need to run inside DDEV containers, when configuring DDEV services, or when managing DDEV add-ons. Triggers on "ddev", "run composer in ddev", "ddev add-on", "ddev config", any command execution in a project that has a .ddev directory, and questions about adding services like Redis, Elasticsearch, or Solr to a DDEV project.
allowed-tools: Read, Glob, Grep, Bash
---

# DDEV Command Execution and Environment Guide

You are assisting with a project that uses DDEV — a Docker-based local development environment for PHP and Node.js projects. When DDEV is present, most CLI commands must be executed through DDEV to run inside the correct container with the right PHP version, extensions, Node.js version, and database access.

**References:** All reference files are in the `references/` directory within this skill.

## Step 1 — Detect DDEV

Before executing any project command, check for DDEV:

1. Look for a `.ddev/` directory in the project root
2. If found, read `.ddev/config.yaml` to understand the project type, PHP version, database, and other settings
3. All subsequent commands must be routed through DDEV as described below

If the project does not have a `.ddev/` directory, this skill does not apply.

## Step 2 — Route commands through DDEV

Read `references/01-detection-and-commands.md` for the full command mapping.

**The core rule:** any command that needs the project's runtime environment (PHP, Node.js, database access, CMS CLI tools) must be prefixed with `ddev`. Commands that operate purely on the host (git, IDE commands, file browsing) do not need the prefix.

Quick reference for the most common commands:

| Instead of running... | Run this instead |
|---|---|
| `composer install` | `ddev composer install` |
| `composer require foo/bar` | `ddev composer require foo/bar` |
| `npm install` | `ddev npm install` |
| `npm run build` | `ddev npm run build` |
| `npx something` | `ddev npx something` |
| `yarn install` | `ddev yarn install` |
| `php artisan migrate` | `ddev artisan migrate` |
| `drush cr` | `ddev drush cr` |
| `wp plugin list` | `ddev wp plugin list` |
| `mysql` | `ddev mysql` |
| `psql` | `ddev psql` |
| `php script.php` | `ddev php script.php` |

For CMS/framework-specific commands, read `references/05-cms-framework-commands.md`.

## Step 3 — Understand the project configuration

If you need to understand or modify the DDEV environment, read `references/02-configuration.md`. Key things to check in `.ddev/config.yaml`:

- `type` — the project type (drupal, laravel, wordpress, etc.) determines which CLI shortcuts are available
- `php_version` — the PHP version running in the container
- `nodejs_version` — the Node.js version in the container
- `database` — the database engine and version (e.g., `mariadb:11.8`, `postgres:16`)
- `webserver_type` — nginx-fpm or apache-fpm

## Step 4 — Use the right references for the task

Load only the references relevant to what the user needs:

- **Command routing and detection** → `references/01-detection-and-commands.md`
- **Project configuration** → `references/02-configuration.md`
- **Database operations** → `references/03-database-operations.md`
- **Adding services via add-ons** → `references/04-addons.md`
- **CMS/framework CLI commands** → `references/05-cms-framework-commands.md`
- **Debugging and development tools** → `references/06-debugging-and-tools.md`

## Key principles

**Always check for DDEV before running commands.** If a `.ddev/` directory exists, assume DDEV is the intended runtime. Running `composer install` on the host when DDEV is present will use the wrong PHP version and likely fail or produce incorrect results.

**Use DDEV wrappers, not `ddev exec`.** Prefer `ddev composer` over `ddev exec composer`, `ddev drush` over `ddev exec drush`, etc. The wrappers handle edge cases and are the supported interface.

**Do not run host-level package managers for in-container work.** If the user needs to install a PHP package, use `ddev composer`. If they need a Node package, use `ddev npm` or `ddev yarn`. Never install these on the host for a DDEV project.

**Git runs on the host.** Git operations (`git add`, `git commit`, `git push`) always run directly — never through DDEV.

**DDEV must be running.** Commands like `ddev composer` require the project to be started. If you get connection errors, run `ddev start` first. Use `ddev status` or `ddev describe` to check.

**Add-ons extend DDEV, not application code.** When the user needs Redis, Elasticsearch, Solr, or similar services, these are added via DDEV add-ons — not by installing them on the host or in the container manually. Read `references/04-addons.md`.
