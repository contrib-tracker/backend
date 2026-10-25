# DDEV Add-ons

Add-ons extend DDEV with additional services, tools, and integrations. They are installed per-project and managed through the `ddev add-on` command.

## Managing add-ons

```bash
# Install an add-on
ddev add-on get ddev/ddev-redis

# Install a specific version
ddev add-on get ddev/ddev-redis --version v1.0.4

# Remove an add-on
ddev add-on remove redis

# List installed add-ons
ddev add-on list --installed

# List all available official add-ons
ddev add-on list

# Search for add-ons
ddev add-on search redis
```

After installing or removing an add-on, restart DDEV:

```bash
ddev restart
```

## Common add-ons by use case

### Caching

| Add-on | Command | Description |
|---|---|---|
| `ddev/ddev-redis` | `ddev add-on get ddev/ddev-redis` | Redis in-memory cache and data store. The most popular caching add-on. |
| `ddev/ddev-redis-insight` | `ddev add-on get ddev/ddev-redis-insight` | Redis Insight web UI for inspecting Redis data. Install alongside ddev-redis. |
| `ddev/ddev-memcached` | `ddev add-on get ddev/ddev-memcached` | Memcached distributed caching. |
| `ddev/ddev-varnish` | `ddev add-on get ddev/ddev-varnish` | Varnish HTTP reverse proxy cache. For full-page caching in front of the web server. |

### Search

| Add-on | Command | Description |
|---|---|---|
| `ddev/ddev-elasticsearch` | `ddev add-on get ddev/ddev-elasticsearch` | Elasticsearch full-text search engine. |
| `ddev/ddev-opensearch` | `ddev add-on get ddev/ddev-opensearch` | OpenSearch — open-source Elasticsearch alternative. |
| `ddev/ddev-solr` | `ddev add-on get ddev/ddev-solr` | Apache Solr search platform. |
| `ddev/ddev-drupal-solr` | `ddev add-on get ddev/ddev-drupal-solr` | Solr pre-configured for Drupal Search API. |
| `ddev/ddev-typo3-solr` | `ddev add-on get ddev/ddev-typo3-solr` | Solr pre-configured for TYPO3. |

### Databases and data stores

| Add-on | Command | Description |
|---|---|---|
| `ddev/ddev-mongo` | `ddev add-on get ddev/ddev-mongo` | MongoDB NoSQL database. |
| `ddev/ddev-sqlsrv` | `ddev add-on get ddev/ddev-sqlsrv` | Microsoft SQL Server support. |

### Database management UIs

| Add-on | Command | Description |
|---|---|---|
| `ddev/ddev-adminer` | `ddev add-on get ddev/ddev-adminer` | Adminer — lightweight web-based database browser. |
| `ddev/ddev-phpmyadmin` | `ddev add-on get ddev/ddev-phpmyadmin` | phpMyAdmin interface for MySQL/MariaDB. |

### Message queues and async

| Add-on | Command | Description |
|---|---|---|
| `ddev/ddev-rabbitmq` | `ddev add-on get ddev/ddev-rabbitmq` | RabbitMQ message broker with management UI. |

### Object storage

| Add-on | Command | Description |
|---|---|---|
| `ddev/ddev-minio` | `ddev add-on get ddev/ddev-minio` | MinIO S3-compatible object storage for local file storage testing. |

### Testing and quality

| Add-on | Command | Description |
|---|---|---|
| `ddev/ddev-selenium-standalone-chrome` | `ddev add-on get ddev/ddev-selenium-standalone-chrome` | Headless Chrome via Selenium for browser testing. |
| `ddev/ddev-cypress` | `ddev add-on get ddev/ddev-cypress` | Cypress end-to-end testing framework. |
| `ddev/ddev-backstopjs` | `ddev add-on get ddev/ddev-backstopjs` | BackstopJS visual regression testing. |

### Development tools

| Add-on | Command | Description |
|---|---|---|
| `ddev/ddev-browsersync` | `ddev add-on get ddev/ddev-browsersync` | BrowserSync for live-reload and CSS injection during theme development. |
| `ddev/ddev-cron` | `ddev add-on get ddev/ddev-cron` | Run scheduled cron tasks inside the container. |
| `ddev/ddev-qr` | `ddev add-on get ddev/ddev-qr` | Generate QR codes for project URLs (useful for mobile testing). |
| `ddev/ddev-drupal-contrib` | `ddev add-on get ddev/ddev-drupal-contrib` | Contrib module development environment for Drupal. |

### Node.js tooling

| Add-on | Command | Description |
|---|---|---|
| `ddev/ddev-nvm` | `ddev add-on get ddev/ddev-nvm` | NVM (Node Version Manager) for managing multiple Node.js versions. |
| `ddev/ddev-pnpm` | `ddev add-on get ddev/ddev-pnpm` | pnpm package manager support. |

### Web server alternatives

| Add-on | Command | Description |
|---|---|---|
| `ddev/ddev-frankenphp` | `ddev add-on get ddev/ddev-frankenphp` | FrankenPHP — modern PHP application server built on Caddy. |

### Platform/hosting integrations

| Add-on | Command | Description |
|---|---|---|
| `ddev/ddev-upsun` | `ddev add-on get ddev/ddev-upsun` | Upsun / Platform.sh hosting integration. |
| `ddev/ddev-ibexa-cloud` | `ddev add-on get ddev/ddev-ibexa-cloud` | Ibexa Cloud hosting integration. |

### PHP extensions/loaders

| Add-on | Command | Description |
|---|---|---|
| `ddev/ddev-ioncube` | `ddev add-on get ddev/ddev-ioncube` | ionCube PHP loaders for encoded PHP files. |

## Typical add-on combinations by project type

### Drupal projects
```bash
ddev add-on get ddev/ddev-redis          # Object/page caching
ddev add-on get ddev/ddev-drupal-solr    # Search API + Solr
ddev add-on get ddev/ddev-browsersync    # Theme development
ddev add-on get ddev/ddev-selenium-standalone-chrome  # Functional testing
```

### Laravel projects
```bash
ddev add-on get ddev/ddev-redis          # Cache, sessions, queues
ddev add-on get ddev/ddev-minio          # S3-compatible storage
ddev add-on get ddev/ddev-rabbitmq       # Queue backend
```

### WordPress projects
```bash
ddev add-on get ddev/ddev-redis          # Object caching
ddev add-on get ddev/ddev-elasticsearch  # WP search enhancement
ddev add-on get ddev/ddev-browsersync    # Theme development
```

### E-commerce (Magento/Shopware)
```bash
ddev add-on get ddev/ddev-redis          # Cache and sessions
ddev add-on get ddev/ddev-elasticsearch  # Product search
ddev add-on get ddev/ddev-varnish        # Full-page caching
ddev add-on get ddev/ddev-rabbitmq       # Async message processing
```

## Third-party add-ons

The add-on ecosystem is open. Community-maintained add-ons follow the same `ddev add-on get <owner>/<repo>` pattern. Search for them with:

```bash
ddev add-on search <term>
```

Or browse the DDEV add-on registry online.
