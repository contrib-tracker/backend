# Database Operations

## Direct database access

```bash
# MySQL/MariaDB interactive client
ddev mysql

# Run a single query
ddev mysql -e "SHOW TABLES;"

# PostgreSQL interactive client
ddev psql

# Run a single PostgreSQL query
ddev psql -c "SELECT * FROM users LIMIT 5;"
```

## Import database

```bash
# Import from SQL file
ddev import-db --file=dump.sql

# Import from compressed file (gzip, bzip2, xz, zip supported)
ddev import-db --file=dump.sql.gz

# Import from stdin
cat dump.sql | ddev import-db

# Import into a non-default database
ddev import-db --database=other_db --file=dump.sql

# Import and extract from a specific path in an archive
ddev import-db --file=archive.tar.gz --extract-path=db/dump.sql
```

## Export database

```bash
# Export to stdout
ddev export-db > dump.sql

# Export to gzipped file
ddev export-db --gzip --file=/tmp/db.sql.gz

# Export to bzip2 file
ddev export-db --bzip2 --file=/tmp/db.sql.bz2

# Export to xz file
ddev export-db --xz --file=/tmp/db.sql.xz

# Export a specific database
ddev export-db --database=other_db > other.sql
```

## Snapshots (fast backup/restore)

Snapshots use filesystem-level operations and are much faster than SQL dump/import for large databases.

```bash
# Create a snapshot (auto-named with timestamp)
ddev snapshot

# Create a named snapshot
ddev snapshot --name=before-migration

# List snapshots
ddev snapshot --list

# Restore the most recent snapshot
ddev snapshot restore

# Restore a named snapshot
ddev snapshot restore before-migration

# Delete a snapshot
ddev snapshot --cleanup --name=before-migration

# Delete all snapshots
ddev snapshot --cleanup --yes
```

**When to use snapshots vs. import/export:**
- Use **snapshots** for quick local backup/restore cycles (before running migrations, testing destructive operations)
- Use **import/export** when sharing database dumps between environments or team members

## Database GUI access

DDEV can launch desktop database GUI tools that connect to the containerized database:

```bash
ddev sequelace    # Sequel Ace (macOS)
ddev tableplus    # TablePlus (cross-platform)
ddev querious     # Querious (macOS)
ddev dbeaver      # DBeaver (cross-platform)
ddev heidisql     # HeidiSQL (Windows/WSL2/Linux)
```

These require the respective application to be installed on the host.

## Connection details

To get database connection info for manual tool configuration:

```bash
ddev describe
```

This shows the database hostname, port, username, password, and database name. The database is accessible from the host on the port shown (which may be auto-assigned or fixed via `host_db_port` in config).

Inside the container, the database hostname is always `db`.

## Creating additional databases

```bash
# In config.yaml or a config.*.yaml file:
# additional_databases:
#   - name: extra_db

# After adding, restart:
ddev restart

# Access the additional database
ddev mysql -D extra_db
```
