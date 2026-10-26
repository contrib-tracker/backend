#!/bin/sh
# Passes on any response that proves Drupal is answering. 302, 401 and 403
# are normal: an empty database redirects to the blocked installer, and basic
# auth answers 401. The Host header must match TRUSTED_HOST_PATTERNS.
set -eu

host="${HEALTHCHECK_HOST:-${COOLIFY_FQDN:-}}"
host="${host%%,*}"
host="${host#*://}"
host="${host:-localhost}"

code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 8 -H "Host: $host" http://127.0.0.1:80/)
case "$code" in
  200|301|302|401|403) exit 0 ;;
  *) echo "unexpected status $code for Host: $host"; exit 1 ;;
esac
