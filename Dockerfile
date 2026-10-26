# The production image, deployed on Coolify with docker-compose.yml.
# See docs/hosting.md.

# The ct theme has no build, only runtime dependencies (select2).
FROM node:26-trixie-slim AS theme
WORKDIR /theme
COPY web/themes/custom/ct/package.json web/themes/custom/ct/package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --no-audit --no-fund

FROM hussainweb/drupal-base:php8.5-frankenphp-trixie

# Code stays owned by root; www-data writes only to the volumes.
COPY . /app
RUN --mount=type=cache,target=/root/.cache/composer \
    composer install --no-dev --optimize-autoloader --apcu-autoloader --no-interaction --no-progress
COPY --from=theme /theme/node_modules /app/web/themes/custom/ct/node_modules

COPY docker/Caddyfile /etc/frankenphp/Caddyfile
COPY docker/healthcheck.sh /usr/local/bin/healthcheck

# Created here so that new named volumes inherit www-data ownership.
RUN mkdir -p web/sites/default/files private \
    && chown www-data:www-data web/sites/default/files private \
    && chown -R www-data:www-data /config/caddy /data/caddy

# The commit the image was built from, for Sentry and the deployment identifier.
ARG APP_RELEASE=""
ENV APP_RELEASE=${APP_RELEASE}

USER www-data

# Replaces the base image's TCP check with one that proves Drupal answers.
HEALTHCHECK --interval=30s --timeout=10s --start-period=5m --start-interval=5s --retries=3 \
  CMD ["/usr/local/bin/healthcheck"]
